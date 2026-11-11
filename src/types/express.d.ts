export type UserRole = 'student' | 'teacher' | 'admin';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      auth?: {
        userId: string;
        role: UserRole;
      };
    }
  }
}

export {};
