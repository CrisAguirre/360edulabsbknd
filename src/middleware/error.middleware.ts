import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { logger } from '../config/logger';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(new AppError(404, `No existe la ruta ${req.method} ${req.originalUrl}`, 'NOT_FOUND'));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Revisa los datos enviados',
        details: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
        requestId: req.requestId
      }
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
        requestId: req.requestId
      }
    });
    return;
  }

  if (typeof err === 'object' && err !== null && 'code' in err && (err as { code: number }).code === 11000) {
    res.status(409).json({
      error: {
        code: 'CONFLICT',
        message: 'Ya existe un registro con esos datos',
        requestId: req.requestId
      }
    });
    return;
  }

  if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'ValidationError') {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos no cumplen las reglas del modelo',
        requestId: req.requestId
      }
    });
    return;
  }

  logger.error({ err, requestId: req.requestId }, 'Unhandled error');
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Ocurrió un error inesperado',
      requestId: req.requestId
    }
  });
}
