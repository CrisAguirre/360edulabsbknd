import type { Request, Response } from 'express';
import { z } from 'zod';
import { objectIdSchema } from '../validators/common.schemas';
import {
  createUser,
  getUser,
  importUsersCsv,
  listUsers,
  resetUserPassword,
  updateUser
} from '../services/user.service';
import type { UserRole } from '../models/User';

const roleSchema = z.enum(['student', 'teacher', 'admin']);

const listUsersSchema = z.object({
  role: roleSchema.optional(),
  search: z.string().trim().max(100).optional(),
  active: z.enum(['true', 'false']).optional(),
  classroomId: objectIdSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export async function listUsersController(req: Request, res: Response): Promise<void> {
  const query = listUsersSchema.parse(req.query);
  const result = await listUsers(req.auth!.userId, req.auth!.role, {
    ...query,
    active: query.active === undefined ? undefined : query.active === 'true'
  });
  res.json({ data: result, meta: { requestId: req.requestId } });
}

const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9._-]{3,30}$/, 'El usuario debe tener entre 3 y 30 caracteres (letras, números, punto, guion o guion bajo)'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(200),
  displayName: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres').max(80),
  role: roleSchema.optional(),
  avatarKey: z.string().trim().max(40).optional(),
  classroomIds: z.array(objectIdSchema).max(20).optional()
});

export async function createUserController(req: Request, res: Response): Promise<void> {
  const input = createUserSchema.parse(req.body);
  const user = await createUser(req.auth!.userId, req.auth!.role, input);
  res.status(201).json({ data: user, meta: { requestId: req.requestId } });
}

export async function getUserController(req: Request, res: Response): Promise<void> {
  const userId = objectIdSchema.parse(req.params.id);
  const user = await getUser(req.auth!.userId, req.auth!.role, userId);
  res.json({ data: user, meta: { requestId: req.requestId } });
}

const updateUserSchema = z.object({
  displayName: z.string().trim().min(2).max(80).optional(),
  role: roleSchema.optional(),
  avatarKey: z.string().trim().max(40).optional(),
  active: z.boolean().optional()
});

export async function updateUserController(req: Request, res: Response): Promise<void> {
  const userId = objectIdSchema.parse(req.params.id);
  const input = updateUserSchema.parse(req.body);
  const user = await updateUser(req.auth!.userId, req.auth!.role, userId, input);
  res.json({ data: user, meta: { requestId: req.requestId } });
}

export async function resetPasswordController(req: Request, res: Response): Promise<void> {
  const userId = objectIdSchema.parse(req.params.id);
  const result = await resetUserPassword(req.auth!.userId, req.auth!.role, userId);
  res.json({ data: result, meta: { requestId: req.requestId } });
}

const importUsersSchema = z.object({
  csv: z.string().min(5, 'El CSV está vacío').max(200_000),
  classroomId: objectIdSchema.optional()
});

export async function importUsersController(req: Request, res: Response): Promise<void> {
  const input = importUsersSchema.parse(req.body);
  const result = await importUsersCsv(req.auth!.userId, req.auth!.role, input.csv, input.classroomId);
  res.status(201).json({ data: result, meta: { requestId: req.requestId } });
}

export type { UserRole };
