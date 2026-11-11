import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';
import {
  classroomDashboardController,
  classroomDetailController,
  createClassroomController,
  enrollStudentsController,
  joinClassroomController,
  listClassroomsController,
  removeEnrollmentController,
  updateClassroomController
} from '../controllers/classroom.controller';

export const classroomRouter = Router();

classroomRouter.use(authenticate);
classroomRouter.get('/', asyncHandler(listClassroomsController));
classroomRouter.post('/join', asyncHandler(joinClassroomController));
classroomRouter.post('/', authorize('teacher', 'admin'), asyncHandler(createClassroomController));
classroomRouter.get('/:id', authorize('teacher', 'admin'), asyncHandler(classroomDetailController));
classroomRouter.patch('/:id', authorize('teacher', 'admin'), asyncHandler(updateClassroomController));
classroomRouter.post('/:id/enrollments', authorize('teacher', 'admin'), asyncHandler(enrollStudentsController));
classroomRouter.delete(
  '/:id/enrollments/:studentId',
  authorize('teacher', 'admin'),
  asyncHandler(removeEnrollmentController)
);
classroomRouter.get('/:id/dashboard', asyncHandler(classroomDashboardController));
