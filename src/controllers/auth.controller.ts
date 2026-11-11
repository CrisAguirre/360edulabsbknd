import type { CookieOptions, Request, Response } from 'express';
import { config } from '../config/env';
import { changePasswordSchema, loginSchema } from '../validators/auth.schemas';
import { changePassword, login, revokeSession, rotateSession, toSafeUser } from '../services/auth.service';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

function cookieOptions(expiresAt?: Date): CookieOptions {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: 'lax',
    path: '/api/v1/auth',
    ...(expiresAt ? { expires: expiresAt } : {})
  };
}

export async function loginController(req: Request, res: Response): Promise<void> {
  const data = loginSchema.parse(req.body);
  const session = await login(data.username, data.password, {
    userAgent: req.header('user-agent'),
    ip: req.ip
  });

  res.cookie(config.refreshCookieName, session.refreshToken, cookieOptions(session.refreshExpiresAt));
  res.json({
    data: {
      user: session.user,
      accessToken: session.accessToken
    },
    meta: { requestId: req.requestId }
  });
}

export async function refreshController(req: Request, res: Response): Promise<void> {
  const token = req.cookies?.[config.refreshCookieName] as string | undefined;
  if (!token) {
    throw new AppError(401, 'No hay una sesión activa', 'UNAUTHENTICATED');
  }

  const session = await rotateSession(token, {
    userAgent: req.header('user-agent'),
    ip: req.ip
  });

  res.cookie(config.refreshCookieName, session.refreshToken, cookieOptions(session.refreshExpiresAt));
  res.json({
    data: {
      user: session.user,
      accessToken: session.accessToken
    },
    meta: { requestId: req.requestId }
  });
}

export async function logoutController(req: Request, res: Response): Promise<void> {
  const token = req.cookies?.[config.refreshCookieName] as string | undefined;
  await revokeSession(token);
  res.clearCookie(config.refreshCookieName, cookieOptions());
  res.status(204).send();
}

export async function meController(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.auth!.userId);
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado', 'NOT_FOUND');
  }
  res.json({ data: toSafeUser(user), meta: { requestId: req.requestId } });
}

export async function changePasswordController(req: Request, res: Response): Promise<void> {
  const data = changePasswordSchema.parse(req.body);
  await changePassword(req.auth!.userId, data.currentPassword, data.newPassword);
  res.clearCookie(config.refreshCookieName, cookieOptions());
  res.status(204).send();
}
