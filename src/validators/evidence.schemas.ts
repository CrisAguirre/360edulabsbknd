import { z } from 'zod';
import { objectIdSchema } from './common.schemas';

const optionalLink = z
  .union([z.string().trim().url('El enlace no es válido'), z.literal('')])
  .optional();

export const saveEvidenceSchema = z.object({
  missionId: objectIdSchema,
  activityId: objectIdSchema,
  text: z.string().max(4000).optional(),
  linkUrl: optionalLink,
  type: z.enum(['text', 'image', 'link', 'lab']).optional()
});

export const reviewEvidenceSchema = z.object({
  status: z.enum(['approved', 'changes_requested']),
  teacherScore: z.enum(['bajo', 'basico', 'alto', 'superior']),
  feedback: z.string().trim().max(2000).default('')
});
