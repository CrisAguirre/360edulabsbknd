import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { getActivityController } from '../controllers/mission.controller';
import { completeActivityController } from '../controllers/progress.controller';

export const activityRouter = Router();

activityRouter.use(authenticate);
activityRouter.get('/:id', asyncHandler(getActivityController));
activityRouter.post('/:id/complete', asyncHandler(completeActivityController));
