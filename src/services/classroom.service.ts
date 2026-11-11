import { Types } from 'mongoose';
import { Classroom } from '../models/Classroom';
import { Enrollment } from '../models/Enrollment';
import { Evidence } from '../models/Evidence';
import { Mission } from '../models/Mission';
import { Progress } from '../models/Progress';
import { User } from '../models/User';
import { conflict, forbidden, notFound, ruleViolation } from '../utils/AppError';
import type { UserRole } from '../types/express';

async function withStudentCounts<T extends { _id: unknown }>(classrooms: T[]) {
  const counts = await Enrollment.aggregate([
    {
      $match: {
        classroomId: { $in: classrooms.map((classroom) => classroom._id) },
        status: 'active'
      }
    },
    { $group: { _id: '$classroomId', count: { $sum: 1 } } }
  ]);
  const countByClassroom = new Map(counts.map((item: { _id: unknown; count: number }) => [String(item._id), item.count]));
  return classrooms.map((classroom) => ({
    ...classroom,
    studentCount: countByClassroom.get(String(classroom._id)) ?? 0
  }));
}

export async function listClassrooms(userId: string, role: UserRole) {
  if (role === 'admin') {
    return withStudentCounts(await Classroom.find({ active: true }).sort({ name: 1 }).lean());
  }

  if (role === 'teacher') {
    return withStudentCounts(await Classroom.find({ teacherIds: userId, active: true }).sort({ name: 1 }).lean());
  }

  const enrollments = await Enrollment.find({ studentId: userId, status: 'active' }).select('classroomId').lean();
  return withStudentCounts(
    await Classroom.find({
      _id: { $in: enrollments.map((enrollment) => enrollment.classroomId) },
      active: true
    })
      .sort({ name: 1 })
      .lean()
  );
}

export interface CreateClassroomInput {
  name: string;
  code?: string;
  grade?: string;
  school?: string;
  academicYear?: string;
  teacherIds?: string[];
}

export interface UpdateClassroomInput {
  name?: string;
  grade?: string;
  school?: string;
  academicYear?: string;
  settings?: {
    showClassGallery?: boolean;
    allowRetries?: boolean;
  };
}

function randomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'CITO';
  for (let index = 0; index < 3; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

async function generateUniqueCode() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const code = randomCode();
    const exists = await Classroom.exists({ code });
    if (!exists) return code;
  }
  throw ruleViolation('No pudimos generar un código de aula. Intenta de nuevo.');
}

export async function createClassroom(
  userId: string,
  role: UserRole,
  input: CreateClassroomInput
) {
  if (role !== 'teacher' && role !== 'admin') throw forbidden('Solo docentes y administradores crean aulas');

  const requestedCode = input.code?.trim().toUpperCase();
  const code = requestedCode ?? (await generateUniqueCode());
  const existing = await Classroom.findOne({ code });
  if (existing) throw conflict('Ya existe un aula con ese código');

  let teacherIds: Types.ObjectId[] = [new Types.ObjectId(userId)];
  if (role === 'admin' && input.teacherIds && input.teacherIds.length > 0) {
    const teachers = await User.find({
      _id: { $in: input.teacherIds },
      role: { $in: ['teacher', 'admin'] },
      active: true
    }).select('_id').lean();
    if (teachers.length !== input.teacherIds.length) {
      throw ruleViolation('Uno de los docentes asignados no existe o está inactivo');
    }
    teacherIds = teachers.map((teacher) => teacher._id);
  }

  const classroom = await Classroom.create({
    name: input.name.trim(),
    code,
    grade: input.grade?.trim() || '5.º de primaria',
    school: input.school?.trim() || 'Institución educativa',
    academicYear: input.academicYear?.trim() || String(new Date().getFullYear()),
    teacherIds,
    settings: { showClassGallery: false, allowRetries: true }
  });

  return {
    ...classroom.toObject(),
    studentCount: 0
  };
}

export async function getClassroomDetail(userId: string, role: UserRole, classroomId: string) {
  const classroom = await assertClassroomAccess(userId, role, classroomId);
  const enrollments = await Enrollment.find({ classroomId: classroom._id, status: 'active' })
    .populate('studentId', 'displayName username avatarKey role')
    .sort({ joinedAt: 1 })
    .lean();

  return {
    ...classroom.toObject(),
    students: enrollments
      .map((enrollment) => {
        const student = enrollment.studentId as unknown as {
          _id: unknown;
          displayName: string;
          username: string;
          avatarKey: string;
        } | null;
        if (!student) return null;
        return {
          id: String(student._id),
          displayName: student.displayName,
          username: student.username,
          avatarKey: student.avatarKey ?? 'cito',
          joinedAt: enrollment.joinedAt
        };
      })
      .filter(Boolean)
  };
}

export async function updateClassroom(
  userId: string,
  role: UserRole,
  classroomId: string,
  input: UpdateClassroomInput
) {
  if (role !== 'teacher' && role !== 'admin') throw forbidden('Solo docentes y administradores editan aulas');
  const classroom = await assertClassroomAccess(userId, role, classroomId);

  if (input.name !== undefined) classroom.name = input.name.trim();
  if (input.grade !== undefined) classroom.grade = input.grade.trim();
  if (input.school !== undefined) classroom.school = input.school.trim();
  if (input.academicYear !== undefined) classroom.academicYear = input.academicYear.trim();
  if (input.settings) {
    classroom.settings.showClassGallery =
      input.settings.showClassGallery ?? classroom.settings.showClassGallery;
    classroom.settings.allowRetries = input.settings.allowRetries ?? classroom.settings.allowRetries;
  }

  await classroom.save();
  return classroom.toObject();
}

export interface EnrollStudentsInput {
  studentIds?: string[];
  usernames?: string[];
}

export async function enrollStudents(
  userId: string,
  role: UserRole,
  classroomId: string,
  input: EnrollStudentsInput
) {
  if (role !== 'teacher' && role !== 'admin') throw forbidden('Solo docentes y administradores matriculan estudiantes');
  const classroom = await assertClassroomAccess(userId, role, classroomId);

  const ids = input.studentIds ?? [];
  const usernames = (input.usernames ?? []).map((username) => username.trim().toLowerCase());
  if (ids.length === 0 && usernames.length === 0) {
    throw ruleViolation('Indica al menos un estudiante para matricular');
  }

  const students = await User.find({
    active: true,
    role: 'student',
    $or: [
      ...(ids.length > 0 ? [{ _id: { $in: ids } }] : []),
      ...(usernames.length > 0 ? [{ username: { $in: usernames } }] : [])
    ]
  })
    .select('_id username displayName')
    .lean();

  const foundIds = new Set(students.map((student) => String(student._id)));
  const requested = [...ids, ...students.filter((student) => usernames.includes(student.username)).map((student) => String(student._id))];
  const missing = requested.filter((id) => !foundIds.has(id));

  let enrolled = 0;
  let alreadyEnrolled = 0;
  for (const student of students) {
    const existing = await Enrollment.findOne({ classroomId: classroom._id, studentId: student._id });
    if (existing) {
      if (existing.status === 'active') {
        alreadyEnrolled += 1;
      } else {
        existing.status = 'active';
        existing.joinedAt = new Date();
        await existing.save();
        enrolled += 1;
      }
    } else {
      await Enrollment.create({
        classroomId: classroom._id,
        studentId: student._id,
        status: 'active',
        joinedAt: new Date()
      });
      enrolled += 1;
    }
  }

  return {
    enrolled,
    alreadyEnrolled,
    notFound: missing.length,
    students: students.map((student) => ({
      id: String(student._id),
      username: student.username,
      displayName: student.displayName
    }))
  };
}

export async function removeStudentFromClassroom(
  userId: string,
  role: UserRole,
  classroomId: string,
  studentId: string
) {
  if (role !== 'teacher' && role !== 'admin') throw forbidden('Solo docentes y administradores retiran estudiantes');
  const classroom = await assertClassroomAccess(userId, role, classroomId);
  const enrollment = await Enrollment.findOne({ classroomId: classroom._id, studentId });
  if (!enrollment) throw notFound('El estudiante no está matriculado en esta aula');

  enrollment.status = 'inactive';
  await enrollment.save();
  return { classroomId: String(classroom._id), studentId, status: 'inactive' as const };
}

export async function joinClassroomByCode(studentId: string, code: string) {
  const classroom = await Classroom.findOne({ code: code.trim().toUpperCase(), active: true });
  if (!classroom) throw notFound('No encontramos un aula con ese código');

  const existing = await Enrollment.findOne({ classroomId: classroom._id, studentId });
  if (existing) {
    if (existing.status !== 'active') {
      existing.status = 'active';
      existing.joinedAt = new Date();
      await existing.save();
    }
  } else {
    await Enrollment.create({
      classroomId: classroom._id,
      studentId,
      status: 'active',
      joinedAt: new Date()
    });
  }

  return {
    id: String(classroom._id),
    name: classroom.name,
    code: classroom.code,
    grade: classroom.grade,
    school: classroom.school
  };
}

async function assertClassroomAccess(userId: string, role: UserRole, classroomId: string) {
  const classroom = await Classroom.findOne({ _id: classroomId, active: true });
  if (!classroom) throw notFound('Aula no encontrada');

  if (role === 'admin') return classroom;
  if (role === 'teacher' && classroom.teacherIds.some((id) => String(id) === userId)) return classroom;

  const enrollment = await Enrollment.findOne({ classroomId, studentId: userId, status: 'active' });
  if (!enrollment) throw forbidden('No tienes acceso a este aula');
  return classroom;
}

export async function getClassroomDashboard(userId: string, role: UserRole, classroomId: string) {
  const classroom = await assertClassroomAccess(userId, role, classroomId);

  const [enrollments, missions] = await Promise.all([
    Enrollment.find({ classroomId, status: 'active' }).populate('studentId', 'displayName username avatarKey role').lean(),
    Mission.find({ status: 'published' }).sort({ order: 1 }).lean()
  ]);

  const studentIds = enrollments
    .map((enrollment) => {
      const student = enrollment.studentId as unknown as { _id: unknown } | null;
      return student ? String(student._id) : null;
    })
    .filter((id): id is string => Boolean(id));

  const [progressDocs, evidenceCounts] = await Promise.all([
    Progress.find({ studentId: { $in: studentIds } }).lean(),
    Evidence.aggregate([
      {
        $match: {
          studentId: { $in: studentIds.map((id) => new Types.ObjectId(id)) },
          status: { $in: ['submitted', 'changes_requested'] }
        }
      },
      { $group: { _id: '$studentId', count: { $sum: 1 } } }
    ])
  ]);

  const progressByStudent = new Map<string, typeof progressDocs>();
  for (const progress of progressDocs) {
    const key = String(progress.studentId);
    const list = progressByStudent.get(key) ?? [];
    list.push(progress);
    progressByStudent.set(key, list);
  }

  const evidenceByStudent = new Map(
    evidenceCounts.map((item: { _id: unknown; count: number }) => [String(item._id), item.count])
  );

  const students = enrollments.map((enrollment) => {
    const student = enrollment.studentId as unknown as {
      _id: unknown;
      displayName: string;
      username: string;
      avatarKey: string;
    } | null;
    const id = student ? String(student._id) : '';
    const progress = progressByStudent.get(id) ?? [];
    const completedMissions = progress.filter((item) => item.status === 'completed').length;
    const totalXP = progress.reduce((total, item) => total + item.xpEarned, 0);
    const inProgress = progress.find((item) => item.status === 'in_progress');
    const currentProgress = inProgress ?? progress.find((item) => item.status === 'available');
    const currentMission = currentProgress
      ? missions.find((mission) => String(mission._id) === String(currentProgress.missionId))
      : missions[0];

    return {
      id,
      displayName: student?.displayName ?? 'Estudiante',
      username: student?.username ?? '',
      avatarKey: student?.avatarKey ?? 'cito',
      totalXP,
      level: Math.floor(totalXP / 300) + 1,
      completedMissions,
      currentMission: currentMission
        ? { code: currentMission.code, title: currentMission.title, order: currentMission.order }
        : null,
      pendingEvidence: evidenceByStudent.get(id) ?? 0,
      missions: missions.map((mission) => {
        const item = progress.find((entry) => String(entry.missionId) === String(mission._id));
        return {
          code: mission.code,
          status: item?.status ?? 'available',
          xp: item?.xpEarned ?? 0
        };
      })
    };
  });

  const totalStudents = students.length;
  const completed = students.reduce((total, student) => total + student.completedMissions, 0);
  const possible = totalStudents * Math.max(1, missions.length);
  const averageXP = totalStudents === 0 ? 0 : Math.round(students.reduce((total, student) => total + student.totalXP, 0) / totalStudents);

  return {
    classroom: {
      id: String(classroom._id),
      name: classroom.name,
      code: classroom.code,
      grade: classroom.grade,
      school: classroom.school,
      academicYear: classroom.academicYear
    },
    summary: {
      totalStudents,
      averageXP,
      completionRate: possible === 0 ? 0 : Math.round((completed / possible) * 100),
      pendingEvidence: students.reduce((total, student) => total + student.pendingEvidence, 0)
    },
    missions: missions.map((mission) => ({ code: mission.code, title: mission.title, order: mission.order })),
    students
  };
}


