import { Types } from 'mongoose';
import { Activity } from '../models/Activity';
import { Classroom } from '../models/Classroom';
import { Enrollment } from '../models/Enrollment';
import { Evidence, type EvidenceLevel } from '../models/Evidence';
import { Mission } from '../models/Mission';
import { AppError, forbidden, notFound, ruleViolation } from '../utils/AppError';
import { completeSystemActivity, evaluateMissionCompletion } from './progress.service';

export interface EvidenceInput {
  missionId: string;
  activityId: string;
  text?: string;
  linkUrl?: string;
  type?: 'text' | 'image' | 'link' | 'lab';
}

export async function createOrUpdateEvidence(studentId: string, input: EvidenceInput) {
  const mission = await Mission.findOne({ _id: input.missionId, status: 'published' });
  if (!mission) throw notFound('Misión no encontrada');

  const activity = await Activity.findOne({
    _id: input.activityId,
    missionId: mission._id,
    type: 'evidence'
  });
  if (!activity) throw notFound('Actividad de evidencia no encontrada');

  const text = (input.text ?? '').trim();
  const linkUrl = (input.linkUrl ?? '').trim();
  if (text.length < 10 && !linkUrl) {
    throw ruleViolation('Escribe al menos 10 caracteres o agrega un enlace como evidencia');
  }

  let evidence = await Evidence.findOne({ studentId, activityId: activity._id });
  if (evidence?.status === 'approved') {
    throw ruleViolation('La evidencia ya fue aprobada. Solicita una nueva revisión si necesitas cambiarla.');
  }

  if (!evidence) {
    evidence = await Evidence.create({
      studentId,
      missionId: mission._id,
      activityId: activity._id,
      type: input.type ?? (linkUrl ? 'link' : 'text'),
      text,
      linkUrl,
      status: 'draft',
      revisions: [{ text, linkUrl, createdAt: new Date() }]
    });
  } else {
    evidence.text = text;
    evidence.linkUrl = linkUrl;
    evidence.type = input.type ?? evidence.type;
    evidence.status = 'draft';
    evidence.teacherScore = null;
    evidence.feedback = '';
    evidence.revisions.push({ text, linkUrl, createdAt: new Date() });
    await evidence.save();
  }

  return evidence;
}

export async function updateEvidence(
  studentId: string,
  evidenceId: string,
  input: { text?: string; linkUrl?: string; type?: 'text' | 'image' | 'link' | 'lab' }
) {
  const existing = await Evidence.findOne({ _id: evidenceId, studentId });
  if (!existing) throw notFound('Evidencia no encontrada');

  return createOrUpdateEvidence(studentId, {
    missionId: String(existing.missionId),
    activityId: String(existing.activityId),
    text: input.text,
    linkUrl: input.linkUrl,
    type: input.type ?? existing.type
  });
}

export async function submitEvidence(studentId: string, evidenceId: string) {
  const evidence = await Evidence.findOne({ _id: evidenceId, studentId });
  if (!evidence) throw notFound('Evidencia no encontrada');
  if (evidence.status === 'approved') {
    throw ruleViolation('La evidencia ya está aprobada');
  }

  evidence.status = 'submitted';
  await evidence.save();

  const activity = await Activity.findById(evidence.activityId);
  if (!activity) throw notFound('Actividad no encontrada');

  await completeSystemActivity(
    studentId,
    String(evidence.missionId),
    String(evidence.activityId),
    activity.xp
  );
  const missionResult = await evaluateMissionCompletion(studentId, String(evidence.missionId));

  return {
    evidence,
    badgeAwarded: missionResult.badgeAwarded,
    missionCompleted: missionResult.completed
  };
}

export async function listMyEvidence(studentId: string) {
  return Evidence.find({ studentId }).sort({ updatedAt: -1 }).lean();
}

export async function reviewEvidence(
  teacherId: string,
  role: 'teacher' | 'admin',
  evidenceId: string,
  status: 'approved' | 'changes_requested',
  teacherScore: EvidenceLevel,
  feedback: string
) {
  const evidence = await Evidence.findById(evidenceId);
  if (!evidence) throw notFound('Evidencia no encontrada');

  const mission = await Mission.findById(evidence.missionId).select('title').lean();
  if (!mission) throw notFound('Misión no encontrada');

  if (role !== 'admin') {
    const enrollments = await Enrollment.find({ studentId: evidence.studentId }).select('classroomId').lean();
    const classroomIds = enrollments.map((enrollment) => enrollment.classroomId);
    const classroom = await Classroom.findOne({ _id: { $in: classroomIds }, teacherIds: teacherId }).select('_id').lean();
    if (!classroom) throw forbidden('No puedes revisar evidencias de estudiantes fuera de tus aulas');
  }

  evidence.status = status;
  evidence.teacherScore = teacherScore;
  evidence.feedback = feedback.trim();
  evidence.reviewedBy = new Types.ObjectId(teacherId);
  evidence.reviewedAt = new Date();
  await evidence.save();

  return evidence;
}

export async function listClassroomEvidence(userId: string, role: 'teacher' | 'admin', classroomId: string) {
  const classroom = await Classroom.findOne(
    role === 'admin' ? { _id: classroomId } : { _id: classroomId, teacherIds: userId }
  );
  if (!classroom) throw new AppError(403, 'No tienes acceso a este aula', 'FORBIDDEN');

  const enrollments = await Enrollment.find({ classroomId, status: 'active' }).select('studentId').lean();
  const studentIds = enrollments.map((enrollment) => enrollment.studentId);

  return Evidence.find({ studentId: { $in: studentIds }, status: { $in: ['submitted', 'changes_requested'] } })
    .populate('studentId', 'displayName username avatarKey')
    .populate('missionId', 'code title')
    .sort({ updatedAt: 1 })
    .lean();
}
