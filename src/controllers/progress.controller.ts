import type { Request, Response } from 'express';
import { missionCodeSchema } from '../validators/common.schemas';
import { completeActivitySchema, updatePhaseSchema } from '../validators/progress.schemas';
import { getMissionDetail, getProgressSummary } from '../services/mission.service';
import { completeActivity, updateCurrentPhase } from '../services/progress.service';
import { forbidden } from '../utils/AppError';

export async function getMyProgressController(req: Request, res: Response): Promise<void> {
  const summary = await getProgressSummary(req.auth!.userId, req.auth!.role);
  res.json({ data: summary, meta: { requestId: req.requestId } });
}

export async function getMissionProgressController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.missionCode);
  const mission = await getMissionDetail(code, req.auth!.userId, req.auth!.role);
  res.json({ data: mission.progress, meta: { requestId: req.requestId } });
}

export async function updatePhaseController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.missionCode);
  const { phase } = updatePhaseSchema.parse(req.body);
  const progress = await updateCurrentPhase(req.auth!.userId, code, phase);
  res.json({ data: progress, meta: { requestId: req.requestId } });
}

export async function completeActivityController(req: Request, res: Response): Promise<void> {
  if (req.auth!.role !== 'student') {
    throw forbidden('Solo los estudiantes completan actividades');
  }

  const payload = completeActivitySchema.parse(req.body ?? {});
  const result = await completeActivity(req.auth!.userId, String(req.params.id), payload);

  res.json({
    data: {
      activityId: String(result.activity._id),
      status: result.completed ? 'completed' : 'already_completed',
      progress: {
        status: result.progress.status,
        currentPhase: result.progress.currentPhase,
        xpEarned: result.progress.xpEarned
      },
      missionCompleted: result.missionCompleted,
      badgeAwarded: result.badgeAwarded
        ? {
            code: result.badgeAwarded.code,
            name: result.badgeAwarded.name,
            description: result.badgeAwarded.description,
            icon: result.badgeAwarded.icon
          }
        : null
    },
    meta: { requestId: req.requestId }
  });
}
