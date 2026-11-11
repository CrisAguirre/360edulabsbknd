import { Schema, model, type Model } from 'mongoose';

export type MissionStatus = 'draft' | 'published' | 'archived';
export type MissionPhaseKey = 'inicio' | 'desarrollo' | 'cierre';

export interface MissionPhase {
  key: MissionPhaseKey;
  title: string;
  description: string;
  order: number;
}

export interface MissionDocument {
  code: string;
  order: number;
  title: string;
  subtitle: string;
  bigQuestion: string;
  description: string;
  objectives: string[];
  phases: MissionPhase[];
  badgeCode: string;
  estimatedMinutes: number;
  status: MissionStatus;
  version: number;
  theme: {
    accent: string;
    soft: string;
    icon: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const phaseSchema = new Schema<MissionPhase>(
  {
    key: { type: String, enum: ['inicio', 'desarrollo', 'cierre'], required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, required: true }
  },
  { _id: false }
);

const missionSchema = new Schema<MissionDocument>(
  {
    code: { type: String, required: true, unique: true, lowercase: true, trim: true },
    order: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    bigQuestion: { type: String, required: true },
    description: { type: String, default: '' },
    objectives: [{ type: String }],
    phases: { type: [phaseSchema], default: [] },
    badgeCode: { type: String, required: true },
    estimatedMinutes: { type: Number, default: 60 },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
    version: { type: Number, default: 1 },
    theme: {
      accent: { type: String, default: '#58e6c5' },
      soft: { type: String, default: 'rgba(88, 230, 197, 0.14)' },
      icon: { type: String, default: '🔬' }
    }
  },
  { timestamps: true }
);

missionSchema.index({ status: 1, order: 1 });

export const Mission = model<MissionDocument, Model<MissionDocument>>('Mission', missionSchema);
