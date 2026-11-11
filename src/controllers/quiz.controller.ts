import type { Request, Response } from 'express';
import { missionCodeSchema } from '../validators/common.schemas';
import { submitAttemptSchema } from '../validators/quiz.schemas';
import {
  getMyAttempts,
  getQuizForMission,
  startQuizAttempt,
  submitQuizAttempt
} from '../services/quiz.service';

export async function getMissionQuizController(req: Request, res: Response): Promise<void> {
  const code = missionCodeSchema.parse(req.params.missionCode);
  const quiz = await getQuizForMission(code);
  res.json({ data: quiz, meta: { requestId: req.requestId } });
}

export async function startAttemptController(req: Request, res: Response): Promise<void> {
  const attempt = await startQuizAttempt(req.auth!.userId, String(req.params.id));
  res.status(201).json({ data: attempt, meta: { requestId: req.requestId } });
}

export async function submitAttemptController(req: Request, res: Response): Promise<void> {
  const { answers } = submitAttemptSchema.parse(req.body);
  const result = await submitQuizAttempt(req.auth!.userId, String(req.params.id), String(req.params.attemptId), answers);
  res.json({ data: result, meta: { requestId: req.requestId } });
}

export async function getMyAttemptsController(req: Request, res: Response): Promise<void> {
  const attempts = await getMyAttempts(req.auth!.userId, String(req.params.id));
  res.json({ data: attempts, meta: { requestId: req.requestId } });
}
