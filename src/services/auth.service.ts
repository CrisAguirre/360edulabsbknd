import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { HydratedDocument } from 'mongoose';
import { User, type UserDocument, type UserRole } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import { config } from '../config/env';
import { AppError } from '../utils/AppError';

type UserDoc = HydratedDocument<UserDocument>;

export interface SafeUser {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  avatarKey: string;
}

export interface SessionMeta {
  userAgent?: string;
  ip?: string;
}

export interface AuthSession {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: Date;
}

const ACCESS_TTL = config.accessTokenTtl as jwt.SignOptions['expiresIn'];

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function toSafeUser(user: UserDoc): SafeUser {
  return {
    id: String(user._id),
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    avatarKey: user.avatarKey
  };
}

function createAccessToken(user: UserDoc): string {
  return jwt.sign(
    { sub: String(user._id), role: user.role, type: 'access' },
    config.jwtAccessSecret,
    { expiresIn: ACCESS_TTL }
  );
}

function createRefreshToken(userId: string): { token: string; expiresAt: Date } {
  const jti = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + config.refreshTokenTtlDays * 24 * 60 * 60 * 1000);
  const token = jwt.sign(
    { sub: userId, type: 'refresh', jti },
    config.jwtRefreshSecret,
    { expiresIn: `${config.refreshTokenTtlDays}d` }
  );
  return { token, expiresAt };
}

export async function createSession(
  user: UserDoc,
  meta: SessionMeta = {}
): Promise<AuthSession> {
  const accessToken = createAccessToken(user);
  const { token: refreshToken, expiresAt } = createRefreshToken(String(user._id));

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt,
    userAgent: meta.userAgent ?? '',
    ip: meta.ip ?? ''
  });

  return {
    user: toSafeUser(user),
    accessToken,
    refreshToken,
    refreshExpiresAt: expiresAt
  };
}

export async function login(username: string, password: string, meta: SessionMeta = {}): Promise<AuthSession> {
  const user = await User.findOne({ username: username.trim().toLowerCase(), active: true }).select('+passwordHash');
  if (!user) {
    throw new AppError(401, 'Usuario o contraseña incorrectos', 'INVALID_CREDENTIALS');
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    throw new AppError(401, 'Usuario o contraseña incorrectos', 'INVALID_CREDENTIALS');
  }

  user.lastLoginAt = new Date();
  await user.save();
  return createSession(user, meta);
}

export async function rotateSession(
  refreshToken: string,
  meta: SessionMeta = {}
): Promise<AuthSession> {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(refreshToken, config.jwtRefreshSecret) as jwt.JwtPayload;
  } catch {
    throw new AppError(401, 'Sesión expirada. Inicia sesión de nuevo.', 'INVALID_REFRESH_TOKEN');
  }

  if (payload.type !== 'refresh' || !payload.sub) {
    throw new AppError(401, 'Sesión inválida', 'INVALID_REFRESH_TOKEN');
  }

  const tokenHash = hashToken(refreshToken);
  const stored = await RefreshToken.findOne({
    tokenHash,
    revokedAt: null,
    expiresAt: { $gt: new Date() }
  });

  if (!stored) {
    throw new AppError(401, 'Sesión expirada. Inicia sesión de nuevo.', 'INVALID_REFRESH_TOKEN');
  }

  stored.revokedAt = new Date();
  await stored.save();

  const user = await User.findOne({ _id: payload.sub, active: true });
  if (!user) {
    throw new AppError(401, 'Usuario no disponible', 'USER_UNAVAILABLE');
  }

  return createSession(user, meta);
}

export async function revokeSession(refreshToken: string | undefined): Promise<void> {
  if (!refreshToken) return;
  await RefreshToken.updateOne({ tokenHash: hashToken(refreshToken) }, { $set: { revokedAt: new Date() } });
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = await User.findById(userId).select('+passwordHash');
  if (!user) {
    throw new AppError(404, 'Usuario no encontrado', 'NOT_FOUND');
  }

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) {
    throw new AppError(400, 'La contraseña actual no es correcta', 'INVALID_PASSWORD');
  }

  user.passwordHash = await hashPassword(newPassword);
  await user.save();

  await RefreshToken.updateMany(
    { userId: user._id, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
}
