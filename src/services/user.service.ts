import crypto from 'node:crypto';
import { Types } from 'mongoose';
import { Classroom } from '../models/Classroom';
import { Enrollment } from '../models/Enrollment';
import { RefreshToken } from '../models/RefreshToken';
import { User, type UserRole } from '../models/User';
import { hashPassword } from './auth.service';
import { AppError, conflict, forbidden, notFound, ruleViolation } from '../utils/AppError';

export interface UserListOptions {
  role?: UserRole;
  search?: string;
  active?: boolean;
  classroomId?: string;
  page?: number;
  limit?: number;
}

export interface UserView {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  avatarKey: string;
  active: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  classrooms: Array<{ id: string; name: string; code: string }>;
}

export interface CreateUserInput {
  username: string;
  password: string;
  displayName: string;
  role?: UserRole;
  avatarKey?: string;
  classroomIds?: string[];
}

export interface UpdateUserInput {
  displayName?: string;
  role?: UserRole;
  avatarKey?: string;
  active?: boolean;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function teacherClassroomIds(teacherId: string) {
  const classrooms = await Classroom.find({ teacherIds: teacherId, active: true }).select('_id').lean();
  return classrooms.map((classroom) => classroom._id);
}

async function teacherStudentIds(teacherId: string) {
  const classroomIds = await teacherClassroomIds(teacherId);
  const enrollments = await Enrollment.find({ classroomId: { $in: classroomIds }, status: 'active' })
    .select('studentId')
    .lean();
  return enrollments.map((enrollment) => String(enrollment.studentId));
}

interface UserRecord {
  _id: unknown;
  username: string;
  displayName: string;
  role: UserRole;
  avatarKey?: string;
  active?: boolean;
  lastLoginAt?: Date | null;
  createdAt?: Date;
}

async function buildUserViews(users: UserRecord[]): Promise<UserView[]> {
  const ids = users.map((user) => user._id as Types.ObjectId);

  const [enrollments, taughtClassrooms] = await Promise.all([
    Enrollment.find({ studentId: { $in: ids }, status: 'active' })
      .populate('classroomId', 'name code')
      .lean(),
    Classroom.find({ teacherIds: { $in: ids }, active: true })
      .select('name code teacherIds')
      .lean()
  ]);

  const classroomsByStudent = new Map<string, Array<{ id: string; name: string; code: string }>>();
  for (const enrollment of enrollments) {
    const classroom = enrollment.classroomId as unknown as { _id: unknown; name: string; code: string } | null;
    if (!classroom) continue;
    const key = String(enrollment.studentId);
    const list = classroomsByStudent.get(key) ?? [];
    list.push({ id: String(classroom._id), name: classroom.name, code: classroom.code });
    classroomsByStudent.set(key, list);
  }

  const classroomsByTeacher = new Map<string, Array<{ id: string; name: string; code: string }>>();
  for (const classroom of taughtClassrooms) {
    for (const teacherId of classroom.teacherIds ?? []) {
      const key = String(teacherId);
      const list = classroomsByTeacher.get(key) ?? [];
      list.push({ id: String(classroom._id), name: classroom.name, code: classroom.code });
      classroomsByTeacher.set(key, list);
    }
  }

  return users.map((user) => {
    const id = String(user._id);
    const role = user.role as UserRole;
    return {
      id,
      username: String(user.username),
      displayName: String(user.displayName),
      role,
      avatarKey: String(user.avatarKey ?? 'cito'),
      active: Boolean(user.active),
      lastLoginAt: (user.lastLoginAt as Date | null | undefined) ?? null,
      createdAt: user.createdAt as Date,
      classrooms:
        role === 'student'
          ? classroomsByStudent.get(id) ?? []
          : classroomsByTeacher.get(id) ?? []
    };
  });
}

export async function listUsers(actorId: string, actorRole: UserRole, options: UserListOptions) {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.min(100, Math.max(1, options.limit ?? 50));
  const filter: Record<string, unknown> = {};

  if (options.role) filter.role = options.role;
  if (typeof options.active === 'boolean') filter.active = options.active;
  if (options.search) {
    const pattern = new RegExp(escapeRegex(options.search), 'i');
    filter.$or = [{ username: pattern }, { displayName: pattern }];
  }

  if (options.classroomId) {
    const enrollments = await Enrollment.find({ classroomId: options.classroomId, status: 'active' })
      .select('studentId')
      .lean();
    filter._id = { $in: enrollments.map((enrollment) => enrollment.studentId) };
  } else if (actorRole === 'teacher') {
    filter.role = 'student';
    filter._id = { $in: (await teacherStudentIds(actorId)).map((id) => new Types.ObjectId(id)) };
  }

  const [documents, total] = await Promise.all([
    User.find(filter)
      .select('-passwordHash')
      .sort({ role: 1, displayName: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(filter)
  ]);

  return {
    items: await buildUserViews(documents as UserRecord[]),
    total,
    page,
    limit
  };
}

async function assertStudentInTeacherClassrooms(teacherId: string, studentId: string) {
  const classroomIds = await teacherClassroomIds(teacherId);
  const enrollment = await Enrollment.findOne({
    classroomId: { $in: classroomIds },
    studentId,
    status: 'active'
  }).lean();
  if (!enrollment) throw forbidden('Este estudiante no pertenece a tus aulas');
}

export async function getUser(actorId: string, actorRole: UserRole, userId: string): Promise<UserView> {
  const user = await User.findById(userId).select('-passwordHash').lean();
  if (!user) throw notFound('Usuario no encontrado');

  if (actorRole === 'teacher') {
    if (user.role !== 'student') throw forbidden('Solo puedes consultar estudiantes de tus aulas');
    await assertStudentInTeacherClassrooms(actorId, userId);
  }

  const views = await buildUserViews([user as UserRecord]);
  return views[0];
}

export async function createUser(
  actorId: string,
  actorRole: UserRole,
  input: CreateUserInput
): Promise<UserView> {
  const role = input.role ?? 'student';
  if (actorRole === 'teacher' && role !== 'student') {
    throw forbidden('Los docentes solo pueden crear cuentas de estudiante');
  }

  const username = input.username.trim().toLowerCase();
  const existing = await User.findOne({ username }).lean();
  if (existing) throw conflict('Ese nombre de usuario ya está en uso');

  const passwordHash = await hashPassword(input.password);
  const user = await User.create({
    username,
    passwordHash,
    role,
    displayName: input.displayName.trim(),
    avatarKey: input.avatarKey?.trim() || 'cito',
    active: true
  });

  const classroomIds = input.classroomIds ?? [];
  if (classroomIds.length > 0) {
    if (role !== 'student') {
      throw ruleViolation('Solo los estudiantes se pueden matricular en un aula');
    }
    for (const classroomId of classroomIds) {
      const classroom = await Classroom.findOne({ _id: classroomId, active: true });
      if (!classroom) throw notFound('Aula no encontrada');
      if (actorRole === 'teacher' && !classroom.teacherIds.some((id) => String(id) === actorId)) {
        throw forbidden('No puedes matricular estudiantes en un aula que no te pertenece');
      }
      const current = await Enrollment.findOne({ classroomId: classroom._id, studentId: user._id });
      if (current) {
        current.status = 'active';
        current.joinedAt = new Date();
        await current.save();
      } else {
        await Enrollment.create({
          classroomId: classroom._id,
          studentId: user._id,
          status: 'active',
          joinedAt: new Date()
        });
      }
    }
  }

  const views = await buildUserViews([user.toObject() as UserRecord]);
  return views[0];
}

export async function updateUser(
  actorId: string,
  actorRole: UserRole,
  userId: string,
  input: UpdateUserInput
): Promise<UserView> {
  const user = await User.findById(userId);
  if (!user) throw notFound('Usuario no encontrado');

  if (actorRole === 'teacher') {
    if (user.role !== 'student') throw forbidden('Solo puedes editar estudiantes de tus aulas');
    await assertStudentInTeacherClassrooms(actorId, userId);
    if (input.role && input.role !== 'student') {
      throw forbidden('Los docentes no pueden cambiar el rol de una cuenta');
    }
  }

  if (input.displayName !== undefined) user.displayName = input.displayName.trim();
  if (input.avatarKey !== undefined) user.avatarKey = input.avatarKey.trim() || 'cito';
  if (input.active !== undefined) {
    if (String(user._id) === actorId && !input.active) {
      throw ruleViolation('No puedes desactivar tu propia cuenta');
    }
    user.active = input.active;
  }
  if (input.role !== undefined) user.role = input.role;

  await user.save();
  const views = await buildUserViews([user.toObject() as UserRecord]);
  return views[0];
}

function temporaryPassword() {
  return `Cito${crypto.randomInt(1000, 9999)}*`;
}

export async function resetUserPassword(
  actorId: string,
  actorRole: UserRole,
  userId: string
): Promise<{ username: string; temporaryPassword: string }> {
  const user = await User.findById(userId);
  if (!user) throw notFound('Usuario no encontrado');

  if (actorRole === 'teacher') {
    if (user.role !== 'student') throw forbidden('Solo puedes restablecer contraseñas de tus estudiantes');
    await assertStudentInTeacherClassrooms(actorId, userId);
  }

  const password = temporaryPassword();
  user.passwordHash = await hashPassword(password);
  await user.save();
  await RefreshToken.updateMany({ userId: user._id, revokedAt: null }, { $set: { revokedAt: new Date() } });

  return { username: user.username, temporaryPassword: password };
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field.trim());
      field = '';
    } else if (char === '\n') {
      row.push(field.trim());
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }

  row.push(field.trim());
  if (row.some((value) => value.length > 0)) rows.push(row);
  return rows;
}

export interface ImportResult {
  created: UserView[];
  errors: Array<{ row: number; message: string }>;
  total: number;
}

export async function importUsersCsv(
  actorId: string,
  actorRole: UserRole,
  csv: string,
  classroomId?: string
): Promise<ImportResult> {
  const rows = parseCsv(csv.trim());
  if (rows.length < 2) throw ruleViolation('El CSV debe incluir una cabecera y al menos una fila');

  const header = rows[0].map((value) => value.trim().toLowerCase());
  const findColumn = (...names: string[]) => header.findIndex((value) => names.includes(value));
  const usernameIndex = findColumn('username', 'usuario', 'usuario (username)');
  const nameIndex = findColumn('displayname', 'nombre', 'nombre visible');
  const passwordIndex = findColumn('password', 'contraseña', 'contrasena');
  const roleIndex = findColumn('role', 'rol');

  if (usernameIndex < 0 || nameIndex < 0) {
    throw ruleViolation('La cabecera debe incluir username (o usuario) y displayName (o nombre)');
  }

  const created: UserView[] = [];
  const errors: ImportResult['errors'] = [];

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index];
    const username = row[usernameIndex] ?? '';
    const displayName = row[nameIndex] ?? '';
    const password = (passwordIndex >= 0 ? row[passwordIndex] : '') || 'Cito2026*';
    const role = (roleIndex >= 0 ? row[roleIndex] : 'student') || 'student';

    try {
      if (!/^[a-z0-9._-]{3,30}$/i.test(username)) {
        throw ruleViolation('Usuario inválido (3 a 30 caracteres: letras, números, punto, guion o guion bajo)');
      }
      if (displayName.length < 2) throw ruleViolation('Nombre visible demasiado corto');
      if (password.length < 6) throw ruleViolation('La contraseña debe tener al menos 6 caracteres');
      if (role !== 'student' && actorRole === 'teacher') {
        throw ruleViolation('Los docentes solo pueden importar estudiantes');
      }
      if (!['student', 'teacher', 'admin'].includes(role)) {
        throw ruleViolation('Rol inválido');
      }

      const user = await createUser(actorId, actorRole, {
        username,
        displayName,
        password,
        role: role as UserRole,
        classroomIds: classroomId && role === 'student' ? [classroomId] : []
      });
      created.push(user);
    } catch (error) {
      errors.push({
        row: index + 1,
        message: error instanceof AppError ? error.message : 'No pudimos crear esta fila'
      });
    }
  }

  return { created, errors, total: rows.length - 1 };
}
