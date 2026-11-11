export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(statusCode: number, message: string, code = 'APP_ERROR', details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function notFound(message = 'Recurso no encontrado'): AppError {
  return new AppError(404, message, 'NOT_FOUND');
}

export function forbidden(message = 'No tienes permiso para realizar esta acción'): AppError {
  return new AppError(403, message, 'FORBIDDEN');
}

export function conflict(message = 'La operación entra en conflicto con el estado actual'): AppError {
  return new AppError(409, message, 'CONFLICT');
}

export function ruleViolation(message: string, details?: unknown): AppError {
  return new AppError(422, message, 'RULE_VIOLATION', details);
}
