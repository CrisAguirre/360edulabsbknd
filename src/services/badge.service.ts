import type { HydratedDocument } from 'mongoose';
import { Badge } from '../models/Badge';
import { Mission } from '../models/Mission';
import { Progress, type ProgressDocument } from '../models/Progress';
import { StudentBadge } from '../models/StudentBadge';
import { notFound, ruleViolation } from '../utils/AppError';

const MAIN_MISSION_BADGES = ['explorador-celular', 'constructor-conocimiento', 'guardian-energia'];
const FINAL_BADGE_CODE = 'cientifico-citoindagar';

export async function awardBadge(
  studentId: string,
  code: string,
  missionId: string | null,
  source: string,
  progress?: HydratedDocument<ProgressDocument> | null
) {
  const badge = await Badge.findOne({ code });
  if (!badge) return null;

  const existing = await StudentBadge.findOne({ studentId, badgeId: badge._id });
  if (existing) return { badge, awarded: false };

  try {
    await StudentBadge.create({ studentId, badgeId: badge._id, missionId, source });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
      return { badge, awarded: false };
    }
    throw error;
  }

  if (progress) {
    progress.xpEarned += badge.xpBonus;
    await progress.save();
  }

  return { badge, awarded: true };
}

export async function maybeAwardFinalBadge(
  studentId: string,
  progress?: HydratedDocument<ProgressDocument> | null
) {
  const mainBadges = await Badge.find({ code: { $in: MAIN_MISSION_BADGES } }).select('_id').lean();
  if (mainBadges.length < MAIN_MISSION_BADGES.length) return null;

  const earned = await StudentBadge.countDocuments({
    studentId,
    badgeId: { $in: mainBadges.map((badge) => badge._id) }
  });
  if (earned < MAIN_MISSION_BADGES.length) return null;

  return awardBadge(studentId, FINAL_BADGE_CODE, null, 'route', progress);
}

export async function getStudentBadges(studentId: string) {
  const badges = await StudentBadge.find({ studentId })
    .populate('badgeId', 'code name description icon xpBonus')
    .lean();
  return badges;
}

export async function claimBadge(studentId: string, code: string) {
  const badge = await Badge.findOne({ code: code.trim().toLowerCase() });
  if (!badge) throw notFound('Insignia no encontrada');

  const existing = await StudentBadge.findOne({ studentId, badgeId: badge._id });
  if (existing) {
    return { badge, awarded: false, alreadyOwned: true };
  }

  if (badge.code === FINAL_BADGE_CODE) {
    const mainBadges = await Badge.find({ code: { $in: MAIN_MISSION_BADGES } }).select('_id').lean();
    const earned = await StudentBadge.countDocuments({
      studentId,
      badgeId: { $in: mainBadges.map((item) => item._id) }
    });
    if (earned < MAIN_MISSION_BADGES.length) {
      throw ruleViolation('Aún no cumples los criterios para esta insignia', {
        requiredBadges: MAIN_MISSION_BADGES,
        earned
      });
    }
  } else {
    const mission = await Mission.findOne({ badgeCode: badge.code });
    if (!mission) {
      throw ruleViolation('Esta insignia se otorga automáticamente');
    }
    const progress = await Progress.findOne({
      studentId,
      missionId: mission._id,
      status: 'completed'
    });
    if (!progress) {
      throw ruleViolation('Aún no completas la misión asociada a esta insignia');
    }
  }

  const result = await awardBadge(studentId, badge.code, null, 'claim', null);
  return {
    badge: result?.badge ?? badge,
    awarded: result?.awarded ?? false,
    alreadyOwned: false
  };
}
