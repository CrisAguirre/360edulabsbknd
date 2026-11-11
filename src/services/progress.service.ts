import type { HydratedDocument } from 'mongoose';
import { Activity, type ActivityDocument, type CompletionRule } from '../models/Activity';
import { Mission } from '../models/Mission';
import { Progress, type ProgressDocument } from '../models/Progress';
import { AppError, conflict, notFound, ruleViolation } from '../utils/AppError';
import { awardBadge, maybeAwardFinalBadge } from './badge.service';
import { firstPendingPhase } from './mission.service';
import { sortActivities } from '../utils/activityOrder';

export function validateCompletionRule(rule: CompletionRule, payload: Record<string, unknown>): void {
  switch (rule.type) {
    case 'confirm':
      if (payload.confirmed !== true) {
        throw ruleViolation('Debes confirmar que completaste la actividad', { required: { confirmed: true } });
      }
      break;
    case 'video_progress': {
      const progress = Number(payload.progress ?? 0);
      if (!Number.isFinite(progress) || progress < rule.min) {
        throw ruleViolation(`Debes observar al menos el ${rule.min} % del video`, {
          required: { progress: rule.min },
          received: progress
        });
      }
      break;
    }
    case 'faces_explored': {
      const faces = Number(payload.faces ?? 0);
      if (!Number.isFinite(faces) || faces < rule.min) {
        throw ruleViolation(`Debes explorar al menos ${rule.min} caras del cubo`, {
          required: { faces: rule.min },
          received: faces
        });
      }
      break;
    }
    case 'evidence_submitted':
      throw ruleViolation('Esta actividad se completa enviando una evidencia');
    case 'quiz_passed':
      throw ruleViolation('Esta actividad se completa aprobando el quiz');
    default:
      throw ruleViolation('Regla de completitud no soportada');
  }
}

async function getProgressOrThrow(
  studentId: string,
  missionId: string
): Promise<HydratedDocument<ProgressDocument>> {
  const progress = await Progress.findOne({ studentId, missionId });
  if (!progress) throw conflict('Primero inicia la misión');
  return progress;
}

function markActivity(
  progress: HydratedDocument<ProgressDocument>,
  activity: HydratedDocument<ActivityDocument>,
  xp: number
): boolean {
  let activityProgress = progress.activities.find(
    (item) => String(item.activityId) === String(activity._id)
  );

  if (!activityProgress) {
    progress.activities.push({
      activityId: activity._id,
      status: 'pending',
      attempts: 0
    } as (typeof progress.activities)[number]);
    activityProgress = progress.activities[progress.activities.length - 1];
  }

  if (activityProgress.status === 'completed') return false;

  activityProgress.status = 'completed';
  activityProgress.completedAt = new Date();
  activityProgress.attempts += 1;
  progress.xpEarned += xp;
  return true;
}

export async function completeActivity(
  studentId: string,
  activityId: string,
  payload: Record<string, unknown>
) {
  const activity = await Activity.findById(activityId);
  if (!activity) throw notFound('Actividad no encontrada');

  const progress = await getProgressOrThrow(studentId, String(activity.missionId));
  const current = progress.activities.find((item) => String(item.activityId) === String(activity._id));
  if (current?.status === 'completed') {
    return { progress, activity, completed: false, badgeAwarded: null, missionCompleted: false };
  }

  validateCompletionRule(activity.completionRule, payload);
  markActivity(progress, activity, activity.xp);
  await progress.save();
  const missionResult = await evaluateMissionCompletion(studentId, String(activity.missionId));

  return {
    progress: missionResult.progress,
    activity,
    completed: true,
    badgeAwarded: missionResult.badgeAwarded,
    missionCompleted: missionResult.completed
  };
}

export async function completeSystemActivity(
  studentId: string,
  missionId: string,
  activityId: string,
  xp: number
): Promise<boolean> {
  const activity = await Activity.findOne({ _id: activityId, missionId });
  if (!activity) throw notFound('Actividad no encontrada');
  const progress = await getProgressOrThrow(studentId, missionId);
  const changed = markActivity(progress, activity, xp);
  if (changed) await progress.save();
  return changed;
}

export async function evaluateMissionCompletion(studentId: string, missionId: string) {
  const mission = await Mission.findById(missionId);
  if (!mission) throw notFound('Misión no encontrada');

  const activities = sortActivities(await Activity.find({ missionId }));
  const progress = await getProgressOrThrow(studentId, missionId);
  const required = activities.filter((activity) => activity.required);
  const completedIds = new Set(
    progress.activities.filter((item) => item.status === 'completed').map((item) => String(item.activityId))
  );
  const allCompleted = required.every((activity) => completedIds.has(String(activity._id)));

  if (!allCompleted) {
    const nextPhase = firstPendingPhase(progress, activities);
    if (progress.currentPhase !== nextPhase) {
      progress.currentPhase = nextPhase;
      await progress.save();
    }
    return { completed: false, badgeAwarded: null, progress };
  }

  const alreadyCompleted = progress.status === 'completed';
  if (!alreadyCompleted) {
    progress.status = 'completed';
    progress.completedAt = new Date();
    progress.currentPhase = 'cierre';
    await progress.save();
  }

  const badgeResult = await awardBadge(
    studentId,
    mission.badgeCode,
    missionId,
    `mission:${mission.code}`,
    progress
  );
  await maybeAwardFinalBadge(studentId, progress);

  if (!alreadyCompleted) {
    const nextMission = await Mission.findOne({ order: mission.order + 1, status: 'published' });
    if (nextMission) {
      const existingNext = await Progress.findOne({ studentId, missionId: nextMission._id });
      if (!existingNext) {
        const nextActivities = sortActivities(await Activity.find({ missionId: nextMission._id }));
        await Progress.create({
          studentId,
          missionId: nextMission._id,
          status: 'available',
          currentPhase: 'inicio',
          activities: nextActivities.map((activity) => ({
            activityId: activity._id,
            status: 'pending',
            attempts: 0
          }))
        });
      }
    }
  }

  return {
    completed: true,
    badgeAwarded: badgeResult?.awarded ? badgeResult.badge : null,
    progress
  };
}

export async function getProgressForMission(studentId: string, missionId: string) {
  const progress = await Progress.findOne({ studentId, missionId });
  if (!progress) throw new AppError(404, 'No hay progreso para esta misión', 'NOT_FOUND');
  return progress;
}

export async function updateCurrentPhase(
  studentId: string,
  missionCode: string,
  phase: 'inicio' | 'desarrollo' | 'cierre'
) {
  const mission = await Mission.findOne({ code: missionCode.toLowerCase(), status: 'published' });
  if (!mission) throw notFound('Misión no encontrada');

  const progress = await getProgressOrThrow(studentId, String(mission._id));
  if (progress.status === 'completed') {
    return { missionCode: mission.code, currentPhase: progress.currentPhase, status: progress.status, xpEarned: progress.xpEarned };
  }

  progress.currentPhase = phase;
  await progress.save();
  return {
    missionCode: mission.code,
    currentPhase: progress.currentPhase,
    status: progress.status,
    xpEarned: progress.xpEarned
  };
}
