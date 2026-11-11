import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  claimBadgeController,
  listBadgesController,
  listMyBadgesController
} from '../controllers/badge.controller';

export const badgeRouter = Router();

badgeRouter.use(authenticate);
badgeRouter.get('/', asyncHandler(listBadgesController));
badgeRouter.get('/me', asyncHandler(listMyBadgesController));
badgeRouter.post('/:code/claim', asyncHandler(claimBadgeController));
