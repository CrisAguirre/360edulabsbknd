import type { Request, Response } from 'express';
import { objectIdSchema } from '../validators/common.schemas';
import { reviewEvidenceSchema, saveEvidenceSchema } from '../validators/evidence.schemas';
import {
  createOrUpdateEvidence,
  listClassroomEvidence,
  listMyEvidence,
  reviewEvidence,
  submitEvidence,
  updateEvidence
} from '../services/evidence.service';
import { forbidden } from '../utils/AppError';

export async function listMyEvidenceController(req: Request, res: Response): Promise<void> {
  const evidence = await listMyEvidence(req.auth!.userId);
  res.json({ data: evidence, meta: { requestId: req.requestId } });
}

export async function saveEvidenceController(req: Request, res: Response): Promise<void> {
  if (req.auth!.role !== 'student' && req.auth!.role !== 'admin') {
    throw forbidden('Solo los estudiantes y administradores entregan evidencias');
  }
  const input = saveEvidenceSchema.parse(req.body);
  const evidence = await createOrUpdateEvidence(req.auth!.userId, input);
  res.status(201).json({ data: evidence, meta: { requestId: req.requestId } });
}

export async function updateEvidenceController(req: Request, res: Response): Promise<void> {
  if (req.auth!.role !== 'student' && req.auth!.role !== 'admin') {
    throw forbidden('Solo los estudiantes y administradores editan evidencias');
  }
  const evidenceId = objectIdSchema.parse(req.params.id);
  const input = saveEvidenceSchema.omit({ missionId: true, activityId: true }).parse(req.body);
  const evidence = await updateEvidence(req.auth!.userId, evidenceId, input);
  res.json({ data: evidence, meta: { requestId: req.requestId } });
}

export async function submitEvidenceController(req: Request, res: Response): Promise<void> {
  const evidenceId = objectIdSchema.parse(req.params.id);
  const result = await submitEvidence(req.auth!.userId, evidenceId);
  res.json({
    data: {
      evidence: result.evidence,
      missionCompleted: result.missionCompleted,
      badgeAwarded: result.badgeAwarded
        ? {
            code: result.badgeAwarded.code,
            name: result.badgeAwarded.name,
            icon: result.badgeAwarded.icon,
            description: result.badgeAwarded.description
          }
        : null
    },
    meta: { requestId: req.requestId }
  });
}

export async function listClassroomEvidenceController(req: Request, res: Response): Promise<void> {
  const classroomId = objectIdSchema.parse(req.query.classroomId);
  const evidence = await listClassroomEvidence(
    req.auth!.userId,
    req.auth!.role === 'admin' ? 'admin' : 'teacher',
    classroomId
  );
  res.json({ data: evidence, meta: { requestId: req.requestId } });
}

export async function reviewEvidenceController(req: Request, res: Response): Promise<void> {
  const evidenceId = objectIdSchema.parse(req.params.id);
  const input = reviewEvidenceSchema.parse(req.body);
  const evidence = await reviewEvidence(
    req.auth!.userId,
    req.auth!.role === 'admin' ? 'admin' : 'teacher',
    evidenceId,
    input.status,
    input.teacherScore,
    input.feedback
  );
  res.json({ data: evidence, meta: { requestId: req.requestId } });
}
