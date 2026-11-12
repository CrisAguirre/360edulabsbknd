import type { Request, Response } from 'express';
import { Badge } from '../models/Badge';
import { claimBadge, getStudentBadges } from '../services/badge.service';
import { forbidden } from '../utils/AppError';

export async function listBadgesController(req: Request, res: Response): Promise<void> {
  const badges = await Badge.find().sort({ order: 1 }).lean();
  res.json({ data: badges, meta: { requestId: req.requestId } });
}

export async function listMyBadgesController(req: Request, res: Response): Promise<void> {
  const badges = await getStudentBadges(req.auth!.userId);
  res.json({ data: badges, meta: { requestId: req.requestId } });
}

export async function claimBadgeController(req: Request, res: Response): Promise<void> {
  if (req.auth!.role !== 'student' && req.auth!.role !== 'admin') {
    throw forbidden('Solo los estudiantes y administradores reclaman insignias');
  }
  const result = await claimBadge(req.auth!.userId, String(req.params.code));
  res.json({ data: result, meta: { requestId: req.requestId } });
}
