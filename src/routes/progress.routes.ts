import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  completeActivityController,
  getMissionProgressController,
  getMyProgressController,
  updatePhaseController
} from '../controllers/progress.controller';
import { startMissionController } from '../controllers/mission.controller';

export const progressRouter = Router();

progressRouter.use(authenticate);
progressRouter.get('/me', asyncHandler(getMyProgressController));
progressRouter.get('/:missionCode', asyncHandler(getMissionProgressController));
progressRouter.post('/:missionCode/start', asyncHandler(startMissionController));
progressRouter.post('/:missionCode/phase', asyncHandler(updatePhaseController));
progressRouter.post('/activities/:id/complete', asyncHandler(completeActivityController));
