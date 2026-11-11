import { Types } from 'mongoose';
import { Activity } from '../models/Activity';
import { Badge } from '../models/Badge';
import { Classroom } from '../models/Classroom';
import { Enrollment } from '../models/Enrollment';
import { Evidence } from '../models/Evidence';
import { Mission } from '../models/Mission';
import { Progress } from '../models/Progress';
import { Quiz } from '../models/Quiz';
import { QuizAttempt } from '../models/QuizAttempt';
import { RefreshToken } from '../models/RefreshToken';
import { StudentBadge } from '../models/StudentBadge';
import { User } from '../models/User';
import { hashPassword } from '../services/auth.service';
import { sortActivities } from '../utils/activityOrder';
import { badgeSeed } from './badges';
import { missionsSeed } from './missions';
import { quizzesSeed } from './quizzes';
import { demoUsers, progressScenarios } from './users';

export interface SeedSummary {
  missions: number;
  activities: number;
  quizzes: number;
  users: number;
  students: number;
  enrollments: number;
  progress: number;
  evidences: number;
  badges: number;
  classroomCode: string;
}

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

async function clearDemoData(): Promise<void> {
  await Promise.all([
    Evidence.deleteMany({}),
    QuizAttempt.deleteMany({}),
    StudentBadge.deleteMany({}),
    Progress.deleteMany({}),
    Enrollment.deleteMany({}),
    Classroom.deleteMany({}),
    Quiz.deleteMany({}),
    Activity.deleteMany({}),
    Mission.deleteMany({}),
    RefreshToken.deleteMany({}),
    User.deleteMany({}),
    Badge.deleteMany({})
  ]);
}

async function createQuizAttempt(
  studentId: Types.ObjectId,
  quiz: { _id: Types.ObjectId; questions: unknown[]; passScore: number },
  percentage: number,
  submittedAt: Date
): Promise<void> {
  const total = quiz.questions.length;
  await QuizAttempt.create({
    quizId: quiz._id,
    studentId,
    attemptNumber: 1,
    answers: [],
    score: Math.round((percentage / 100) * total),
    percentage,
    passed: percentage >= quiz.passScore,
    startedAt: submittedAt,
    submittedAt,
    durationSeconds: 240
  });
}

export async function seedIfEmpty(): Promise<boolean> {
  const [missionCount, userCount] = await Promise.all([
    Mission.estimatedDocumentCount(),
    User.estimatedDocumentCount()
  ]);
  if (missionCount > 0 || userCount > 0) return false;
  await seedDatabase();
  return true;
}

export async function seedDatabase(): Promise<SeedSummary> {
  await clearDemoData();

  const badgeDocs = await Badge.insertMany(badgeSeed);
  const badgeByCode = new Map(badgeDocs.map((badge) => [badge.code, badge]));

  const missionDocs = await Mission.insertMany(
    missionsSeed.map(({ activities: _activities, ...mission }) => mission)
  );
  const missionByCode = new Map(missionDocs.map((mission) => [mission.code, mission]));
  const missionCodeById = new Map(missionDocs.map((mission) => [String(mission._id), mission.code]));

  const activityDocs = await Activity.insertMany(
    missionsSeed.flatMap((mission) =>
      mission.activities.map((activity) => ({
        missionId: missionByCode.get(mission.code)!._id,
        ...activity
      }))
    )
  );

  const activitiesByMission = new Map<string, typeof activityDocs>();
  for (const activity of activityDocs) {
    const missionCode = missionCodeById.get(String(activity.missionId));
    if (!missionCode) continue;
    const list = activitiesByMission.get(missionCode) ?? [];
    list.push(activity);
    activitiesByMission.set(missionCode, list);
  }
  for (const [missionCode, list] of activitiesByMission) {
    activitiesByMission.set(missionCode, sortActivities(list));
  }

  const quizDocs = await Quiz.insertMany(
    quizzesSeed.map((quiz) => ({
      missionId: missionByCode.get(quiz.missionCode)!._id,
      title: quiz.title,
      passScore: quiz.passScore,
      maxAttempts: quiz.maxAttempts,
      questions: quiz.questions,
      version: 1,
      published: true
    }))
  );
  const quizByMission = new Map(
    quizzesSeed.map((quiz, index) => [quiz.missionCode, quizDocs[index]])
  );

  const passwordHashes = new Map<string, string>();
  for (const user of demoUsers) {
    if (!passwordHashes.has(user.password)) {
      passwordHashes.set(user.password, await hashPassword(user.password));
    }
  }

  const userDocs = await User.insertMany(
    demoUsers.map((user) => ({
      username: user.username,
      passwordHash: passwordHashes.get(user.password)!,
      role: user.role,
      displayName: user.displayName,
      avatarKey: user.avatarKey
    }))
  );
  const userByUsername = new Map(userDocs.map((user) => [user.username, user]));

  const teacher = userByUsername.get('docente01');
  if (!teacher) throw new Error('No se pudo crear el docente de demostración');

  const classroom = await Classroom.create({
    name: '5.º A - Exploradores',
    code: 'CITO5A',
    grade: '5.º de primaria',
    school: 'Colegio Horizonte',
    academicYear: '2026',
    teacherIds: [teacher._id],
    settings: { showClassGallery: false, allowRetries: true }
  });

  const studentDocs = userDocs.filter((user) => user.role === 'student');
  await Enrollment.insertMany(
    studentDocs.map((student) => ({
      classroomId: classroom._id,
      studentId: student._id,
      status: 'active',
      joinedAt: daysAgo(30)
    }))
  );

  let progressCount = 0;
  let evidenceCount = 0;
  let studentBadgeCount = 0;

  for (const scenario of progressScenarios) {
    const student = userByUsername.get(scenario.username);
    if (!student) continue;

    let missionIndex = 0;
    for (const missionCode of scenario.completedMissions) {
      const mission = missionByCode.get(missionCode);
      const badge = badgeByCode.get(mission?.badgeCode ?? '');
      const activities = activitiesByMission.get(missionCode) ?? [];
      if (!mission) continue;

      const required = activities.filter((activity) => activity.required);
      const percentage = scenario.quizPercentages?.[missionCode] ?? 0;
      const startedAt = daysAgo(20 - missionIndex * 4);
      const completedAt = daysAgo(16 - missionIndex * 4);

      await Progress.create({
        studentId: student._id,
        missionId: mission._id,
        status: 'completed',
        currentPhase: 'cierre',
        activities: activities.map((activity) => {
          const completed = activity.required;
          return {
            activityId: activity._id,
            status: completed ? 'completed' : 'pending',
            completedAt: completed ? completedAt : null,
            attempts: completed ? 1 : 0
          };
        }),
        xpEarned: required.reduce((total, activity) => total + activity.xp, 0) + (badge?.xpBonus ?? 0),
        bestQuizPercentage: percentage,
        startedAt,
        completedAt
      });
      progressCount += 1;

      if (badge) {
        await StudentBadge.create({
          studentId: student._id,
          badgeId: badge._id,
          missionId: mission._id,
          awardedAt: completedAt,
          source: `mission:${mission.code}`
        });
        studentBadgeCount += 1;
      }

      const quiz = quizByMission.get(missionCode);
      if (quiz && percentage > 0) {
        await createQuizAttempt(student._id, quiz, percentage, completedAt);
      }

      missionIndex += 1;
    }

    if (scenario.inProgress) {
      const mission = missionByCode.get(scenario.inProgress.missionCode);
      const activities = activitiesByMission.get(scenario.inProgress.missionCode) ?? [];
      if (mission) {
        const required = activities.filter((activity) => activity.required);
        const completed = required.slice(0, Math.max(0, scenario.inProgress.completedRequired));
        const completedIds = new Set(completed.map((activity) => String(activity._id)));
        const nextActivity = required.find((activity) => !completedIds.has(String(activity._id)));

        await Progress.create({
          studentId: student._id,
          missionId: mission._id,
          status: 'in_progress',
          currentPhase: nextActivity?.phase ?? 'cierre',
          activities: activities.map((activity) => {
            const done = completedIds.has(String(activity._id));
            return {
              activityId: activity._id,
              status: done ? 'completed' : 'pending',
              completedAt: done ? daysAgo(3) : null,
              attempts: done ? 1 : 0
            };
          }),
          xpEarned: completed.reduce((total, activity) => total + activity.xp, 0),
          bestQuizPercentage: scenario.inProgress.bestQuizPercentage ?? 0,
          startedAt: daysAgo(4),
          completedAt: null
        });
        progressCount += 1;
      }
    }

    for (const missionCode of scenario.availableMissions ?? []) {
      const mission = missionByCode.get(missionCode);
      const activities = activitiesByMission.get(missionCode) ?? [];
      if (!mission) continue;

      await Progress.create({
        studentId: student._id,
        missionId: mission._id,
        status: 'available',
        currentPhase: 'inicio',
        activities: activities.map((activity) => ({
          activityId: activity._id,
          status: 'pending',
          completedAt: null,
          attempts: 0
        })),
        xpEarned: 0,
        bestQuizPercentage: 0,
        startedAt: null,
        completedAt: null
      });
      progressCount += 1;
    }

    for (const evidence of scenario.evidences ?? []) {
      const mission = missionByCode.get(evidence.missionCode);
      const activities = activitiesByMission.get(evidence.missionCode) ?? [];
      const evidenceActivity = activities.find((activity) => activity.type === 'evidence');
      if (!mission || !evidenceActivity) continue;

      const progress = await Progress.findOne({ studentId: student._id, missionId: mission._id });
      if (progress) {
        const item = progress.activities.find(
          (activity) => String(activity.activityId) === String(evidenceActivity._id)
        );
        if (item && item.status !== 'completed') {
          item.status = 'completed';
          item.completedAt = daysAgo(2);
          item.attempts += 1;
          progress.xpEarned += evidenceActivity.xp;
          await progress.save();
        }
      }

      await Evidence.create({
        studentId: student._id,
        missionId: mission._id,
        activityId: evidenceActivity._id,
        type: evidence.linkUrl ? 'link' : 'text',
        text: evidence.text,
        linkUrl: evidence.linkUrl ?? '',
        status: evidence.status,
        teacherScore: evidence.teacherScore ?? null,
        feedback: evidence.feedback ?? '',
        reviewedBy: evidence.status === 'submitted' ? null : teacher._id,
        reviewedAt: evidence.status === 'submitted' ? null : daysAgo(1),
        revisions: [
          {
            text: evidence.text,
            linkUrl: evidence.linkUrl ?? '',
            createdAt: daysAgo(5)
          }
        ]
      });
      evidenceCount += 1;
    }
  }

  const finalBadge = badgeByCode.get('cientifico-citoindagar');
  if (finalBadge) {
    for (const scenario of progressScenarios) {
      if (scenario.completedMissions.length < 3) continue;
      const student = userByUsername.get(scenario.username);
      const m3 = missionByCode.get('m3');
      if (!student || !m3) continue;

      const progress = await Progress.findOne({ studentId: student._id, missionId: m3._id });
      if (progress) {
        progress.xpEarned += finalBadge.xpBonus;
        await progress.save();
      }
      await StudentBadge.create({
        studentId: student._id,
        badgeId: finalBadge._id,
        missionId: null,
        awardedAt: daysAgo(1),
        source: 'route'
      });
      studentBadgeCount += 1;
    }
  }

  return {
    missions: missionDocs.length,
    activities: activityDocs.length,
    quizzes: quizDocs.length,
    users: userDocs.length,
    students: studentDocs.length,
    enrollments: studentDocs.length,
    progress: progressCount,
    evidences: evidenceCount,
    badges: studentBadgeCount,
    classroomCode: classroom.code
  };
}
