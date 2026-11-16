import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(3, 'El usuario debe tener al menos 3 caracteres').max(50),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').max(200)
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6).max(200),
  newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres').max(200)
});

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede exceder 80 caracteres')
});
