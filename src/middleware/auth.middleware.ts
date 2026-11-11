import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from '../utils/AppError';
import type { UserRole } from '../types/express';

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    next(new AppError(401, 'Debes iniciar sesión', 'UNAUTHENTICATED'));
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtAccessSecret) as jwt.JwtPayload;
    if (payload.type !== 'access' || !payload.sub || !payload.role) {
      throw new Error('Invalid access token');
    }
    req.auth = {
      userId: String(payload.sub),
      role: payload.role as UserRole
    };
    next();
  } catch {
    next(new AppError(401, 'Sesión expirada o inválida', 'UNAUTHENTICATED'));
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.auth) {
      next(new AppError(401, 'Debes iniciar sesión', 'UNAUTHENTICATED'));
      return;
    }
    if (!roles.includes(req.auth.role)) {
      next(new AppError(403, 'No tienes permiso para esta acción', 'FORBIDDEN'));
      return;
    }
    next();
  };
}
