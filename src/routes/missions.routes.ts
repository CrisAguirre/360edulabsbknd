import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  getMissionActivitiesController,
  getMissionController,
  listMissionsController
} from '../controllers/mission.controller';

export const missionRouter = Router();

missionRouter.use(authenticate);
missionRouter.get('/', asyncHandler(listMissionsController));
missionRouter.get('/:code', asyncHandler(getMissionController));
missionRouter.get('/:code/activities', asyncHandler(getMissionActivitiesController));
