import { Types } from 'mongoose';
import { Activity } from '../models/Activity';
import { Badge } from '../models/Badge';
import { Classroom } from '../models/Classroom';
import { Enrollment } from '../models/Enrollment';
import { Evidence } from '../models/Evidence';
import { Mission, type MissionStatus } from '../models/Mission';
import { Progress } from '../models/Progress';
import { Quiz } from '../models/Quiz';
import { QuizAttempt } from '../models/QuizAttempt';
import { StudentBadge } from '../models/StudentBadge';
import { User } from '../models/User';
import { notFound } from '../utils/AppError';

type CountRow = { _id: string | null; count: number };

function countMap(rows: CountRow[]) {
  return Object.fromEntries(rows.map((row) => [row._id ?? 'unknown', row.count]));
}

export async function getAdminOverview() {
  const [
    usersByRole,
    activeUsers,
    classroomTotal,
    activeEnrollments,
    missionsByStatus,
    activityTotal,
    evidenceByStatus,
    badgeTotal,
    quizAttemptAggregate,
    progressAggregate
  ] = await Promise.all([
    User.aggregate<CountRow>([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    User.countDocuments({ active: true }),
    Classroom.countDocuments({ active: true }),
    Enrollment.countDocuments({ status: 'active' }),
    Mission.aggregate<CountRow>([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Activity.countDocuments(),
    Evidence.aggregate<CountRow>([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    StudentBadge.countDocuments(),
    QuizAttempt.aggregate<{ _id: null; count: number; average: number }>([
      { $match: { submittedAt: { $ne: null } } },
      { $group: { _id: null, count: { $sum: 1 }, average: { $avg: '$percentage' } } }
    ]),
    Progress.aggregate<{ _id: null; xp: number; completed: number }>([
      {
        $group: {
          _id: null,
          xp: { $sum: '$xpEarned' },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } }
        }
      }
    ])
  ]);

  const users = countMap(usersByRole);
  const missions = countMap(missionsByStatus);
  const evidence = countMap(evidenceByStatus);

  return {
    users: {
      total: Object.values(users).reduce((total, value) => total + value, 0),
      students: users.student ?? 0,
      teachers: users.teacher ?? 0,
      admins: users.admin ?? 0,
      active: activeUsers
    },
    classrooms: {
      total: classroomTotal,
      activeEnrollments
    },
    missions: {
      total: Object.values(missions).reduce((total, value) => total + value, 0),
      published: missions.published ?? 0,
      draft: missions.draft ?? 0,
      archived: missions.archived ?? 0,
      activities: activityTotal
    },
    evidence: {
      total: Object.values(evidence).reduce((total, value) => total + value, 0),
      pending: (evidence.submitted ?? 0) + (evidence.changes_requested ?? 0),
      approved: evidence.approved ?? 0,
      drafts: evidence.draft ?? 0,
      changesRequested: evidence.changes_requested ?? 0
    },
    quizzes: {
      attempts: quizAttemptAggregate[0]?.count ?? 0,
      averagePercentage: Math.round(quizAttemptAggregate[0]?.average ?? 0)
    },
    gamification: {
      badgesAwarded: badgeTotal,
      totalXP: progressAggregate[0]?.xp ?? 0,
      completedMissions: progressAggregate[0]?.completed ?? 0
    }
  };
}

export async function listAdminMissions() {
  const missions = await Mission.find().sort({ order: 1 }).lean();
  const missionIds = missions.map((mission) => mission._id);
  const [activities, quizzes] = await Promise.all([
    Activity.find({ missionId: { $in: missionIds } })
      .select('missionId type phase required xp')
      .lean(),
    Quiz.find({ missionId: { $in: missionIds } })
      .select('missionId title passScore questions published version')
      .lean()
  ]);

  const activitiesByMission = new Map<string, typeof activities>();
  for (const activity of activities) {
    const key = String(activity.missionId);
    const list = activitiesByMission.get(key) ?? [];
    list.push(activity);
    activitiesByMission.set(key, list);
  }

  const quizByMission = new Map(quizzes.map((quiz) => [String(quiz.missionId), quiz]));

  return missions.map((mission) => {
    const list = activitiesByMission.get(String(mission._id)) ?? [];
    const quiz = quizByMission.get(String(mission._id));
    return {
      ...mission,
      activityCount: list.length,
      requiredCount: list.filter((activity) => activity.required).length,
      xpAvailable: list.reduce((total, activity) => total + activity.xp, 0),
      quiz: quiz
        ? {
            id: String(quiz._id),
            title: quiz.title,
            passScore: quiz.passScore,
            questionCount: quiz.questions.length,
            published: quiz.published,
            version: quiz.version
          }
        : null
    };
  });
}

export async function setMissionStatus(missionId: string, status: MissionStatus) {
  const mission = await Mission.findById(missionId);
  if (!mission) throw notFound('Misión no encontrada');
  mission.status = status;
  mission.version += status === 'published' ? 1 : 0;
  await mission.save();
  return mission.toObject();
}

export async function listAdminQuizzes() {
  const quizzes = await Quiz.find()
    .populate('missionId', 'code title order status')
    .select('title passScore maxAttempts questions version published missionId createdAt updatedAt')
    .sort({ createdAt: 1 })
    .lean();

  return quizzes.map((quiz) => {
    const mission = quiz.missionId as unknown as {
      _id: unknown;
      code: string;
      title: string;
      order: number;
      status: string;
    } | null;

    return {
      id: String(quiz._id),
      title: quiz.title,
      missionCode: mission?.code ?? '',
      missionTitle: mission?.title ?? '',
      missionOrder: mission?.order ?? 0,
      passScore: quiz.passScore,
      maxAttempts: quiz.maxAttempts,
      questionCount: quiz.questions.length,
      version: quiz.version,
      published: quiz.published,
      updatedAt: quiz.updatedAt
    };
  });
}

export async function listAssetLibrary() {
  const [activities, missions] = await Promise.all([
    Activity.find().select('missionId type title assetKeys phase xp').lean(),
    Mission.find().select('code title order').lean()
  ]);

  const missionById = new Map(missions.map((mission) => [String(mission._id), mission]));
  const assets = new Map<
    string,
    {
      key: string;
      category: string;
      uses: number;
      activities: Array<{ id: string; title: string; type: string; missionCode: string; phase: string }>;
    }
  >();

  for (const activity of activities) {
    const mission = missionById.get(String(activity.missionId));
    const keys = activity.assetKeys.length > 0 ? activity.assetKeys : [`tipo:${activity.type}`];
    for (const key of keys) {
      const entry = assets.get(key) ?? {
        key,
        category: key.includes('.') ? key.split('.').pop() ?? 'otro' : activity.type,
        uses: 0,
        activities: []
      };
      entry.uses += 1;
      entry.activities.push({
        id: String(activity._id),
        title: activity.title,
        type: activity.type,
        missionCode: mission?.code ?? '',
        phase: activity.phase
      });
      assets.set(key, entry);
    }
  }

  const typeCounts = new Map<string, number>();
  for (const activity of activities) {
    typeCounts.set(activity.type, (typeCounts.get(activity.type) ?? 0) + 1);
  }

  const list = [...assets.values()].sort((a, b) => a.key.localeCompare(b.key));

  return {
    summary: {
      totalAssets: list.length,
      totalUses: list.reduce((total, asset) => total + asset.uses, 0),
      activities: activities.length,
      types: [...typeCounts.entries()]
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count)
    },
    assets: list
  };
}

export async function listRecentAdminEvidence() {
  return Evidence.find({ status: { $in: ['submitted', 'changes_requested'] } })
    .populate('studentId', 'displayName username avatarKey')
    .populate('missionId', 'code title')
    .sort({ updatedAt: -1 })
    .limit(8)
    .lean();
}

export async function listAdminClassrooms() {
  const classrooms = await Classroom.find({ active: true }).sort({ name: 1 }).lean();
  const counts = await Enrollment.aggregate<{ _id: Types.ObjectId; count: number }>([
    { $match: { status: 'active' } },
    { $group: { _id: '$classroomId', count: { $sum: 1 } } }
  ]);
  const countByClassroom = new Map(counts.map((item) => [String(item._id), item.count]));
  return classrooms.map((classroom) => ({
    ...classroom,
    studentCount: countByClassroom.get(String(classroom._id)) ?? 0
  }));
}

export async function listBadgeCatalogWithUsage() {
  const badges = await Badge.find().sort({ order: 1 }).lean();
  const counts = await StudentBadge.aggregate<{ _id: Types.ObjectId; count: number }>([
    { $group: { _id: '$badgeId', count: { $sum: 1 } } }
  ]);
  const countByBadge = new Map(counts.map((item) => [String(item._id), item.count]));
  return badges.map((badge) => ({
    ...badge,
    awardedCount: countByBadge.get(String(badge._id)) ?? 0
  }));
}
