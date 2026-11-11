import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  createUserController,
  getUserController,
  importUsersController,
  listUsersController,
  resetPasswordController,
  updateUserController
} from '../controllers/user.controller';

export const userRouter = Router();

userRouter.use(authenticate, authorize('teacher', 'admin'));
userRouter.get('/', asyncHandler(listUsersController));
userRouter.post('/', asyncHandler(createUserController));
userRouter.post('/import', asyncHandler(importUsersController));
userRouter.get('/:id', asyncHandler(getUserController));
userRouter.patch('/:id', asyncHandler(updateUserController));
userRouter.post('/:id/reset-password', asyncHandler(resetPasswordController));
