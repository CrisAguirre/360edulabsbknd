import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdSchema = z
  .string()
  .trim()
  .refine((value) => mongoose.isValidObjectId(value), 'Identificador inválido');

export const missionCodeSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9-]{2,20}$/, 'Código de misión inválido');

export const phaseSchema = z.enum(['inicio', 'desarrollo', 'cierre']);
