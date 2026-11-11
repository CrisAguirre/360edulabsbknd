import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  getMissionQuizController,
  getMyAttemptsController,
  startAttemptController,
  submitAttemptController
} from '../controllers/quiz.controller';

export const quizRouter = Router();

quizRouter.use(authenticate);
quizRouter.get('/mission/:missionCode', asyncHandler(getMissionQuizController));
quizRouter.post('/:id/attempts', asyncHandler(startAttemptController));
quizRouter.post('/:id/attempts/:attemptId/submit', asyncHandler(submitAttemptController));
quizRouter.get('/:id/attempts/me', asyncHandler(getMyAttemptsController));
