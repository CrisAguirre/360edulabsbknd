import { Schema, model, type Model, Types } from 'mongoose';

export interface EnrollmentDocument {
  classroomId: Types.ObjectId;
  studentId: Types.ObjectId;
  status: 'active' | 'inactive';
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const enrollmentSchema = new Schema<EnrollmentDocument>(
  {
    classroomId: { type: Types.ObjectId, ref: 'Classroom', required: true, index: true },
    studentId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

enrollmentSchema.index({ classroomId: 1, studentId: 1 }, { unique: true });

export const Enrollment = model<EnrollmentDocument, Model<EnrollmentDocument>>('Enrollment', enrollmentSchema);
