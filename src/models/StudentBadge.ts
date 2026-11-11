import { Schema, model, type Model, Types } from 'mongoose';

export interface StudentBadgeDocument {
  studentId: Types.ObjectId;
  badgeId: Types.ObjectId;
  missionId?: Types.ObjectId | null;
  awardedAt: Date;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentBadgeSchema = new Schema<StudentBadgeDocument>(
  {
    studentId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    badgeId: { type: Types.ObjectId, ref: 'Badge', required: true, index: true },
    missionId: { type: Types.ObjectId, ref: 'Mission', default: null },
    awardedAt: { type: Date, default: Date.now },
    source: { type: String, default: 'mission' }
  },
  { timestamps: true }
);

studentBadgeSchema.index({ studentId: 1, badgeId: 1 }, { unique: true });

export const StudentBadge = model<StudentBadgeDocument, Model<StudentBadgeDocument>>('StudentBadge', studentBadgeSchema);
