import type { CookieOptions, Request, Response } from 'express';
import type { HydratedDocument } from 'mongoose';
import { config } from '../config/env';
import { changePasswordSchema, loginSchema, updateProfileSchema } from '../validators/auth.schemas';
import { changePassword, login, revokeSession, rotateSession, toSafeUser } from '../services/auth.service';
import { User, type UserDocument } from '../models/User';
import { Enrollment } from '../models/Enrollment';
import { Classroom, type ClassroomDocument } from '../models/Classroom';
import { AppError } from '../utils/AppError';

function cookieOptions(expiresAt?: Date): CookieOptions {
  return {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? 'none' : 'lax',
    path: '/',
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

async function enrichUserProfile(user: HydratedDocument<UserDocument>) {
  let classroom: {
    name: string;
    code: string;
    grade: string;
    school: string;
    academicYear: string;
  } | null = null;
  let classrooms: Array<{ id: string; name: string; code: string; grade: string; school: string }> = [];

  if (user.role === 'student') {
    const enrollment = await Enrollment.findOne({ studentId: user._id, status: 'active' }).populate<{
      classroomId: ClassroomDocument;
    }>('classroomId');
    if (enrollment && enrollment.classroomId) {
      classroom = {
        name: enrollment.classroomId.name,
        code: enrollment.classroomId.code,
        grade: enrollment.classroomId.grade,
        school: enrollment.classroomId.school,
        academicYear: enrollment.classroomId.academicYear
      };
    }
  } else if (user.role === 'teacher') {
    const teacherClasses = await Classroom.find({ teacherIds: user._id, active: true });
    classrooms = teacherClasses.map((c) => ({
      id: String(c._id),
      name: c.name,
      code: c.code,
      grade: c.grade,
      school: c.school
    }));
    if (classrooms.length > 0) {
      classroom = {
        ...classrooms[0],
        academicYear: String(new Date().getFullYear())
      };
    }
  }

  const safe = toSafeUser(user);
  return {
    ...safe,
    classroom,
    classrooms
  };
}

export async function meController(req: Request, res: Response): Promise<void> {
  const user = await User.findById(req.auth!.userId);
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado', 'NOT_FOUND');
  }
  const profile = await enrichUserProfile(user);
  res.json({ data: profile, meta: { requestId: req.requestId } });
}

export async function updateProfileController(req: Request, res: Response): Promise<void> {
  const data = updateProfileSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(
    req.auth!.userId,
    { displayName: data.displayName },
    { new: true }
  );
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado', 'NOT_FOUND');
  }
  const profile = await enrichUserProfile(user);
  res.json({ data: profile, meta: { requestId: req.requestId } });
}

export async function changePasswordController(req: Request, res: Response): Promise<void> {
  const data = changePasswordSchema.parse(req.body);
  await changePassword(req.auth!.userId, data.currentPassword, data.newPassword);
  res.clearCookie(config.refreshCookieName, cookieOptions());
  res.status(204).send();
}
