import { Schema, model, type Model, Types } from 'mongoose';
import type { MissionPhaseKey } from './Mission';

export type ActivityType =
  | 'video360'
  | 'reading'
  | 'model3d'
  | 'animation3d'
  | 'animation2d'
  | 'ar_cube'
  | 'quiver'
  | 'infographic'
  | 'evidence'
  | 'quiz'
  | 'lab';

export type CompletionRule =
  | { type: 'confirm'; label?: string }
  | { type: 'video_progress'; min: number }
  | { type: 'faces_explored'; min: number }
  | { type: 'evidence_submitted' }
  | { type: 'quiz_passed' };

export interface ActivityDocument {
  missionId: Types.ObjectId;
  phase: MissionPhaseKey;
  type: ActivityType;
  order: number;
  title: string;
  instructions: string;
  required: boolean;
  completionRule: CompletionRule;
  content: Record<string, unknown>;
  assetKeys: string[];
  xp: number;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    missionId: { type: Types.ObjectId, ref: 'Mission', required: true, index: true },
    phase: { type: String, enum: ['inicio', 'desarrollo', 'cierre'], required: true },
    type: {
      type: String,
      enum: ['video360', 'reading', 'model3d', 'animation3d', 'animation2d', 'ar_cube', 'quiver', 'infographic', 'evidence', 'quiz', 'lab'],
      required: true
    },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    instructions: { type: String, default: '' },
    required: { type: Boolean, default: true },
    completionRule: { type: Schema.Types.Mixed, required: true },
    content: { type: Schema.Types.Mixed, default: {} },
    assetKeys: [{ type: String }],
    xp: { type: Number, default: 20, min: 0 }
  },
  { timestamps: true }
);

activitySchema.index({ missionId: 1, phase: 1, order: 1 });
activitySchema.index({ missionId: 1, type: 1 });

export const Activity = model<ActivityDocument, Model<ActivityDocument>>('Activity', activitySchema);
