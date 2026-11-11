import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  listClassroomEvidenceController,
  listMyEvidenceController,
  reviewEvidenceController,
  saveEvidenceController,
  submitEvidenceController,
  updateEvidenceController
} from '../controllers/evidence.controller';

export const evidenceRouter = Router();

evidenceRouter.use(authenticate);

evidenceRouter.get('/me', asyncHandler(listMyEvidenceController));
evidenceRouter.get('/', authorize('teacher', 'admin'), asyncHandler(listClassroomEvidenceController));

evidenceRouter.post('/', asyncHandler(saveEvidenceController));
evidenceRouter.patch('/:id', asyncHandler(updateEvidenceController));
evidenceRouter.post('/:id/submit', asyncHandler(submitEvidenceController));
evidenceRouter.post('/:id/review', authorize('teacher', 'admin'), asyncHandler(reviewEvidenceController));
