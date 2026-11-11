import { Schema, model, type Model, Types } from 'mongoose';
import type { MissionPhaseKey } from './Mission';

export type ProgressStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface ActivityProgress {
  activityId: Types.ObjectId;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt?: Date | null;
  attempts: number;
}

export interface ProgressDocument {
  studentId: Types.ObjectId;
  missionId: Types.ObjectId;
  status: ProgressStatus;
  currentPhase: MissionPhaseKey;
  activities: ActivityProgress[];
  xpEarned: number;
  bestQuizPercentage: number;
  startedAt?: Date | null;
  completedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const activityProgressSchema = new Schema<ActivityProgress>(
  {
    activityId: { type: Types.ObjectId, ref: 'Activity', required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
    completedAt: { type: Date, default: null },
    attempts: { type: Number, default: 0 }
  },
  { _id: false }
);

const progressSchema = new Schema<ProgressDocument>(
  {
    studentId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    missionId: { type: Types.ObjectId, ref: 'Mission', required: true, index: true },
    status: {
      type: String,
      enum: ['locked', 'available', 'in_progress', 'completed'],
      default: 'available'
    },
    currentPhase: { type: String, enum: ['inicio', 'desarrollo', 'cierre'], default: 'inicio' },
    activities: { type: [activityProgressSchema], default: [] },
    xpEarned: { type: Number, default: 0, min: 0 },
    bestQuizPercentage: { type: Number, default: 0, min: 0, max: 100 },
    startedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

progressSchema.index({ studentId: 1, missionId: 1 }, { unique: true });
progressSchema.index({ studentId: 1, status: 1 });

export const Progress = model<ProgressDocument, Model<ProgressDocument>>('Progress', progressSchema);
