import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  changePasswordController,
  loginController,
  logoutController,
  meController,
  refreshController
} from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.post('/refresh', asyncHandler(refreshController));
authRouter.post('/logout', asyncHandler(logoutController));
authRouter.get('/me', authenticate, asyncHandler(meController));
authRouter.patch('/password', authenticate, asyncHandler(changePasswordController));
