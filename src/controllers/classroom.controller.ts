import type { Request, Response } from 'express';
import { z } from 'zod';
import { objectIdSchema } from '../validators/common.schemas';
import {
  createClassroom,
  enrollStudents,
  getClassroomDashboard,
  getClassroomDetail,
  joinClassroomByCode,
  listClassrooms,
  removeStudentFromClassroom,
  updateClassroom
} from '../services/classroom.service';
import { forbidden } from '../utils/AppError';

export async function listClassroomsController(req: Request, res: Response): Promise<void> {
  const classrooms = await listClassrooms(req.auth!.userId, req.auth!.role);
  res.json({ data: classrooms, meta: { requestId: req.requestId } });
}

export async function classroomDashboardController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.params.id);
  const dashboard = await getClassroomDashboard(req.auth!.userId, req.auth!.role, classroomId);
  res.json({ data: dashboard, meta: { requestId: req.requestId } });
}

export async function classroomDetailController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.params.id);
  const classroom = await getClassroomDetail(req.auth!.userId, req.auth!.role, classroomId);
  res.json({ data: classroom, meta: { requestId: req.requestId } });
}

const joinClassroomSchema = z.object({
  code: z.string().trim().min(5).max(10)
});

export async function joinClassroomController(req: Request, res: Response): Promise<void> {
  if (req.auth!.role !== 'student') {
    throw forbidden('Solo los estudiantes se unen a un aula con código');
  }
  const { code } = joinClassroomSchema.parse(req.body);
  const classroom = await joinClassroomByCode(req.auth!.userId, code);
  res.status(201).json({ data: classroom, meta: { requestId: req.requestId } });
}

const createClassroomSchema = z.object({
  name: z.string().trim().min(3, 'El nombre debe tener al menos 3 caracteres').max(80),
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{5,10}$/, 'El código debe tener entre 5 y 10 caracteres')
    .optional(),
  grade: z.string().trim().max(60).optional(),
  school: z.string().trim().max(120).optional(),
  academicYear: z.string().trim().max(9).optional(),
  teacherIds: z.array(objectIdSchema).max(10).optional()
});

export async function createClassroomController(req: Request, res: Response): Promise<void> {
  const input = createClassroomSchema.parse(req.body);
  const classroom = await createClassroom(req.auth!.userId, req.auth!.role, input);
  res.status(201).json({ data: classroom, meta: { requestId: req.requestId } });
}

const updateClassroomSchema = z.object({
  name: z.string().trim().min(3).max(80).optional(),
  grade: z.string().trim().max(60).optional(),
  school: z.string().trim().max(120).optional(),
  academicYear: z.string().trim().max(9).optional(),
  settings: z
    .object({
      showClassGallery: z.boolean().optional(),
      allowRetries: z.boolean().optional()
    })
    .optional()
});

export async function updateClassroomController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.params.id);
  const input = updateClassroomSchema.parse(req.body);
  const classroom = await updateClassroom(req.auth!.userId, req.auth!.role, classroomId, input);
  res.json({ data: classroom, meta: { requestId: req.requestId } });
}

const enrollStudentsSchema = z
  .object({
    studentIds: z.array(objectIdSchema).max(100).optional(),
    usernames: z.array(z.string().trim().min(3).max(30)).max(100).optional()
  })
  .refine((value) => (value.studentIds?.length ?? 0) + (value.usernames?.length ?? 0) > 0, {
    message: 'Indica al menos un estudiante'
  });

export async function enrollStudentsController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.params.id);
  const input = enrollStudentsSchema.parse(req.body);
  const result = await enrollStudents(req.auth!.userId, req.auth!.role, classroomId, input);
  res.status(201).json({ data: result, meta: { requestId: req.requestId } });
}

export async function removeEnrollmentController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.params.id);
  const studentId = objectIdSchema.parse(req.params.studentId);
  const result = await removeStudentFromClassroom(req.auth!.userId, req.auth!.role, classroomId, studentId);
  res.json({ data: result, meta: { requestId: req.requestId } });
}
