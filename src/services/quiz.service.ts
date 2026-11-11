import { Activity } from '../models/Activity';
import { Mission } from '../models/Mission';
import { Progress } from '../models/Progress';
import { Quiz, type QuizQuestion } from '../models/Quiz';
import { QuizAttempt } from '../models/QuizAttempt';
import { AppError, forbidden, notFound } from '../utils/AppError';
import { completeSystemActivity, evaluateMissionCompletion } from './progress.service';

export interface SubmittedAnswer {
  questionId: string;
  selected: string[];
}

export interface GradedAnswer {
  questionId: string;
  selected: string[];
  correctAnswers: string[];
  correct: boolean;
  feedback: string;
}

function normalize(values: string[]): string[] {
  return [...values].map((value) => String(value).trim().toLowerCase()).sort();
}

export function gradeQuiz(questions: QuizQuestion[], answers: SubmittedAnswer[]): {
  score: number;
  percentage: number;
  passed: boolean;
  graded: GradedAnswer[];
} {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.selected ?? []]));
  const graded: GradedAnswer[] = questions.map((question) => {
    const selected = answerMap.get(question.id) ?? [];
    const correctAnswers = normalize(question.correctAnswers);
    const normalizedSelected = normalize(selected);
    const correct =
      normalizedSelected.length === correctAnswers.length &&
      normalizedSelected.every((value, index) => value === correctAnswers[index]);

    return {
      questionId: question.id,
      selected,
      correctAnswers: question.correctAnswers,
      correct,
      feedback: question.feedback
    };
  });

  const score = graded.filter((answer) => answer.correct).length;
  const percentage = questions.length === 0 ? 0 : Math.round((score / questions.length) * 100);

  return {
    score,
    percentage,
    passed: percentage >= 70,
    graded
  };
}

export function sanitizeQuiz(quiz: {
  _id: unknown;
  missionId: unknown;
  title: string;
  passScore: number;
  questions: QuizQuestion[];
}) {
  return {
    id: String(quiz._id),
    missionId: String(quiz.missionId),
    title: quiz.title,
    passScore: quiz.passScore,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      type: question.type,
      text: question.text,
      options: question.options
    }))
  };
}

export async function getQuizForMission(code: string) {
  const mission = await Mission.findOne({ code: code.toLowerCase(), status: 'published' });
  if (!mission) throw notFound('Misión no encontrada');

  const quiz = await Quiz.findOne({ missionId: mission._id, published: true });
  if (!quiz) throw notFound('Esta misión todavía no tiene quiz');

  return sanitizeQuiz(quiz);
}

export async function startQuizAttempt(studentId: string, quizId: string) {
  const quiz = await Quiz.findOne({ _id: quizId, published: true });
  if (!quiz) throw notFound('Quiz no encontrado');

  const previousAttempts = await QuizAttempt.countDocuments({ quizId: quiz._id, studentId });
  if (quiz.maxAttempts > 0 && previousAttempts >= quiz.maxAttempts) {
    throw forbidden('Alcanzaste el número máximo de intentos para este quiz');
  }

  const attempt = await QuizAttempt.create({
    quizId: quiz._id,
    studentId,
    attemptNumber: previousAttempts + 1,
    startedAt: new Date()
  });

  return {
    attemptId: String(attempt._id),
    attemptNumber: attempt.attemptNumber,
    quiz: sanitizeQuiz(quiz)
  };
}

export async function submitQuizAttempt(
  studentId: string,
  quizId: string,
  attemptId: string,
  answers: SubmittedAnswer[]
) {
  const quiz = await Quiz.findOne({ _id: quizId, published: true });
  if (!quiz) throw notFound('Quiz no encontrado');

  const attempt = await QuizAttempt.findOne({
    _id: attemptId,
    quizId: quiz._id,
    studentId,
    submittedAt: null
  });
  if (!attempt) throw notFound('Intento no encontrado o ya enviado');

  const result = gradeQuiz(quiz.questions, answers);
  const durationSeconds = Math.max(0, Math.round((Date.now() - attempt.startedAt.getTime()) / 1000));

  attempt.answers = result.graded.map((answer) => ({
    questionId: answer.questionId,
    selected: answer.selected,
    correct: answer.correct
  }));
  attempt.score = result.score;
  attempt.percentage = result.percentage;
  attempt.passed = result.percentage >= quiz.passScore;
  attempt.submittedAt = new Date();
  attempt.durationSeconds = durationSeconds;
  await attempt.save();

  const progress = await Progress.findOne({ studentId, missionId: quiz.missionId });
  if (progress) {
    progress.bestQuizPercentage = Math.max(progress.bestQuizPercentage, result.percentage);
    await progress.save();

    const quizActivity = await Activity.findOne({ missionId: quiz.missionId, type: 'quiz' });
    if (quizActivity && attempt.passed) {
      await completeSystemActivity(studentId, String(quiz.missionId), String(quizActivity._id), quizActivity.xp);
    }

    await evaluateMissionCompletion(studentId, String(quiz.missionId));
  }

  return {
    attemptId: String(attempt._id),
    attemptNumber: attempt.attemptNumber,
    score: result.score,
    total: quiz.questions.length,
    percentage: result.percentage,
    passed: attempt.passed,
    durationSeconds,
    graded: result.graded,
    bestQuizPercentage: progress?.bestQuizPercentage ?? result.percentage
  };
}

export async function getMyAttempts(studentId: string, quizId: string) {
  const attempts = await QuizAttempt.find({ studentId, quizId })
    .select('-answers')
    .sort({ attemptNumber: 1 })
    .lean();
  return attempts;
}

export async function getQuizById(quizId: string) {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw new AppError(404, 'Quiz no encontrado', 'NOT_FOUND');
  return quiz;
}
