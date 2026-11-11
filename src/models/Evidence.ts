import { Schema, model, type Model, Types } from 'mongoose';

export type EvidenceStatus = 'draft' | 'submitted' | 'approved' | 'changes_requested';
export type EvidenceLevel = 'bajo' | 'basico' | 'alto' | 'superior';

export interface EvidenceRevision {
  text: string;
  linkUrl: string;
  createdAt: Date;
}

export interface EvidenceDocument {
  studentId: Types.ObjectId;
  missionId: Types.ObjectId;
  activityId: Types.ObjectId;
  type: 'text' | 'image' | 'link' | 'lab';
  text: string;
  linkUrl: string;
  assetIds: string[];
  status: EvidenceStatus;
  teacherScore?: EvidenceLevel | null;
  feedback: string;
  reviewedBy?: Types.ObjectId | null;
  reviewedAt?: Date | null;
  revisions: EvidenceRevision[];
  createdAt: Date;
  updatedAt: Date;
}

const revisionSchema = new Schema<EvidenceRevision>(
  {
    text: { type: String, default: '' },
    linkUrl: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const evidenceSchema = new Schema<EvidenceDocument>(
  {
    studentId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    missionId: { type: Types.ObjectId, ref: 'Mission', required: true, index: true },
    activityId: { type: Types.ObjectId, ref: 'Activity', required: true },
    type: { type: String, enum: ['text', 'image', 'link', 'lab'], default: 'text' },
    text: { type: String, default: '', maxlength: 4000 },
    linkUrl: { type: String, default: '', maxlength: 1000 },
    assetIds: [{ type: String }],
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'changes_requested'],
      default: 'draft',
      index: true
    },
    teacherScore: { type: String, enum: ['bajo', 'basico', 'alto', 'superior', null], default: null },
    feedback: { type: String, default: '', maxlength: 2000 },
    reviewedBy: { type: Types.ObjectId, ref: 'User', default: null },
    reviewedAt: { type: Date, default: null },
    revisions: { type: [revisionSchema], default: [] }
  },
  { timestamps: true }
);

evidenceSchema.index({ studentId: 1, missionId: 1 });
evidenceSchema.index({ studentId: 1, activityId: 1 }, { unique: true });

export const Evidence = model<EvidenceDocument, Model<EvidenceDocument>>('Evidence', evidenceSchema);
