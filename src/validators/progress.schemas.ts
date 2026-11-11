import { z } from 'zod';

export const completeActivitySchema = z.object({
  confirmed: z.boolean().optional(),
  progress: z.number().min(0).max(100).optional(),
  faces: z.number().int().min(0).max(24).optional(),
  note: z.string().max(2000).optional()
});

export const updatePhaseSchema = z.object({
  phase: z.enum(['inicio', 'desarrollo', 'cierre'])
});
