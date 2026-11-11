import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  adminArchiveMissionController,
  adminAssetsController,
  adminBadgesController,
  adminClassroomsController,
  adminMissionsController,
  adminOverviewController,
  adminPublishMissionController,
  adminQuizzesController,
  adminRecentEvidenceController
} from '../controllers/admin.controller';

export const adminRouter = Router();

adminRouter.use(authenticate, authorize('admin'));
adminRouter.get('/overview', asyncHandler(adminOverviewController));
adminRouter.get('/classrooms', asyncHandler(adminClassroomsController));
adminRouter.get('/missions', asyncHandler(adminMissionsController));
adminRouter.post('/missions/:id/publish', asyncHandler(adminPublishMissionController));
adminRouter.post('/missions/:id/archive', asyncHandler(adminArchiveMissionController));
adminRouter.get('/quizzes', asyncHandler(adminQuizzesController));
adminRouter.get('/assets', asyncHandler(adminAssetsController));
adminRouter.get('/evidence/recent', asyncHandler(adminRecentEvidenceController));
adminRouter.get('/badges', asyncHandler(adminBadgesController));
