import { Activity } from '../models/Activity';
import { Badge } from '../models/Badge';
import { Mission, type MissionDocument, type MissionPhaseKey } from '../models/Mission';
import { Progress, type ProgressDocument } from '../models/Progress';
import { StudentBadge } from '../models/StudentBadge';
import { forbidden, notFound } from '../utils/AppError';
import { sortActivities } from '../utils/activityOrder';
import type { UserRole } from '../types/express';

export interface MissionProgressView {
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  currentPhase: MissionPhaseKey;
  xpEarned: number;
  bestQuizPercentage: number;
  completedActivities: number;
  totalActivities: number;
  startedAt?: Date | null;
  completedAt?: Date | null;
}

export async function listMissions(studentId: string, role: UserRole) {
  const missions = await Mission.find({ status: 'published' }).sort({ order: 1 }).lean();
  const progressDocs = await Progress.find({ studentId }).lean();
  const progressMap = new Map(progressDocs.map((progress) => [String(progress.missionId), progress]));

  const activities = await Activity.find({ missionId: { $in: missions.map((mission) => mission._id) } })
    .select('missionId required')
    .lean();
  const requiredIdsByMission = new Map<string, Set<string>>();
  for (const activity of activities) {
    if (!activity.required) continue;
    const key = String(activity.missionId);
    const ids = requiredIdsByMission.get(key) ?? new Set<string>();
    ids.add(String(activity._id));
    requiredIdsByMission.set(key, ids);
  }

  let previousCompleted = true;
  return missions.map((mission) => {
    const progress = progressMap.get(String(mission._id));
    const requiredIds = requiredIdsByMission.get(String(mission._id)) ?? new Set<string>();
    const totalActivities = requiredIds.size;
    const completedActivities = progress
      ? progress.activities.filter(
          (activity) => activity.status === 'completed' && requiredIds.has(String(activity.activityId))
        ).length
      : 0;
    const defaultStatus = role === 'student' && !previousCompleted ? 'locked' : 'available';
    const status = progress?.status ?? defaultStatus;
    previousCompleted = progress?.status === 'completed';

    return {
      ...mission,
      progress: {
        status,
        currentPhase: progress?.currentPhase ?? 'inicio',
        xpEarned: progress?.xpEarned ?? 0,
        bestQuizPercentage: progress?.bestQuizPercentage ?? 0,
        completedActivities,
        totalActivities,
        startedAt: progress?.startedAt ?? null,
        completedAt: progress?.completedAt ?? null
      } satisfies MissionProgressView
    };
  });
}

export async function getMissionDetail(code: string, studentId: string, role: UserRole) {
  const mission = await Mission.findOne({ code: code.toLowerCase(), status: 'published' }).lean();
  if (!mission) throw notFound('Misión no encontrada');

  const activities = sortActivities(
    await Activity.find({ missionId: mission._id }).lean()
  );
  const progress = await Progress.findOne({ studentId, missionId: mission._id }).lean();

  if (!progress && mission.order > 1 && role === 'student') {
    const previous = await Mission.findOne({ order: mission.order - 1, status: 'published' }).lean();
    if (previous) {
      const previousProgress = await Progress.findOne({ studentId, missionId: previous._id }).lean();
      if (previousProgress?.status !== 'completed') {
        throw forbidden('Primero completa la misión anterior');
      }
    }
  }

  const completedIds = new Set(
    progress?.activities.filter((activity) => activity.status === 'completed').map((activity) => String(activity.activityId)) ?? []
  );
  const status = progress?.status ?? (mission.order === 1 || role !== 'student' ? 'available' : 'locked');

  return {
    ...mission,
    activities: activities.map((activity) => ({
      ...activity,
      status: completedIds.has(String(activity._id)) ? 'completed' : 'pending'
    })),
    progress: {
      status,
      currentPhase: progress?.currentPhase ?? 'inicio',
      xpEarned: progress?.xpEarned ?? 0,
      bestQuizPercentage: progress?.bestQuizPercentage ?? 0,
      completedActivities: completedIds.size,
      totalActivities: activities.filter((activity) => activity.required).length,
      startedAt: progress?.startedAt ?? null,
      completedAt: progress?.completedAt ?? null
    } satisfies MissionProgressView
  };
}

export async function startMission(code: string, studentId: string) {
  const mission = await Mission.findOne({ code: code.toLowerCase(), status: 'published' });
  if (!mission) throw notFound('Misión no encontrada');

  if (mission.order > 1) {
    const previous = await Mission.findOne({ order: mission.order - 1, status: 'published' });
    if (previous) {
      const previousProgress = await Progress.findOne({ studentId, missionId: previous._id });
      if (previousProgress?.status !== 'completed') {
        throw forbidden('Primero completa la misión anterior');
      }
    }
  }

  const activities = sortActivities(await Activity.find({ missionId: mission._id }));
  let progress = await Progress.findOne({ studentId, missionId: mission._id });

  if (!progress) {
    progress = await Progress.create({
      studentId,
      missionId: mission._id,
      status: 'in_progress',
      currentPhase: 'inicio',
      startedAt: new Date(),
      activities: activities.map((activity) => ({ activityId: activity._id, status: 'pending', attempts: 0 }))
    });
  } else if (progress.status !== 'completed') {
    progress.status = 'in_progress';
    progress.startedAt = progress.startedAt ?? new Date();
    for (const activity of activities) {
      if (!progress.activities.some((item) => String(item.activityId) === String(activity._id))) {
        progress.activities.push({ activityId: activity._id, status: 'pending', attempts: 0 });
      }
    }
    await progress.save();
  }

  return progress;
}

export function firstPendingPhase(progress: ProgressDocument, activities: Array<{ _id: unknown; phase: MissionPhaseKey; required: boolean }>): MissionPhaseKey {
  const completed = new Set(
    progress.activities.filter((activity) => activity.status === 'completed').map((activity) => String(activity.activityId))
  );
  for (const phase of ['inicio', 'desarrollo', 'cierre'] as MissionPhaseKey[]) {
    const pending = activities.filter((activity) => activity.phase === phase && activity.required && !completed.has(String(activity._id)));
    if (pending.length > 0) return phase;
  }
  return 'cierre';
}

export async function getProgressSummary(studentId: string, role: UserRole) {
  const missions = await listMissions(studentId, role);
  const progressDocs = await Progress.find({ studentId }).lean();
  const totalXP = progressDocs.reduce((total, progress) => total + progress.xpEarned, 0);
  const level = Math.floor(totalXP / 300) + 1;

  const studentBadges = await StudentBadge.find({ studentId })
    .populate('badgeId', 'code name description icon xpBonus order')
    .sort({ awardedAt: 1 })
    .lean();

  const badges = studentBadges
    .map((studentBadge) => {
      const badge = studentBadge.badgeId as unknown as {
        _id: string;
        code: string;
        name: string;
        description: string;
        icon: string;
        xpBonus: number;
      } | null;
      if (!badge) return null;
      return {
        id: String(badge._id),
        code: badge.code,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        awardedAt: studentBadge.awardedAt
      };
    })
    .filter(Boolean);

  return {
    totalXP,
    level,
    xpToNextLevel: 300 - (totalXP % 300),
    missions,
    badges
  };
}

export async function getActivityById(activityId: string) {
  const activity = await Activity.findById(activityId).lean();
  if (!activity) throw notFound('Actividad no encontrada');

  const mission = await Mission.findOne({ _id: activity.missionId, status: 'published' })
    .select('code title theme')
    .lean();
  if (!mission) throw notFound('Actividad no encontrada');

  return {
    ...activity,
    mission: { code: mission.code, title: mission.title, theme: mission.theme }
  };
}

export async function getMissionByCode(code: string) {
  const mission = await Mission.findOne({ code: code.toLowerCase(), status: 'published' });
  if (!mission) throw notFound('Misión no encontrada');
  return mission;
}

export async function getMissionActivities(missionId: string) {
  return sortActivities(await Activity.find({ missionId }));
}

export async function getBadgeByCode(code: string) {
  return Badge.findOne({ code });
}

export type LeanMission = MissionDocument;
