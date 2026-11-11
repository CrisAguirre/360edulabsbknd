import { Schema, model, type Model } from 'mongoose';

export interface BadgeDocument {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  order: number;
  missionCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const badgeSchema = new Schema<BadgeDocument>(
  {
    code: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    icon: { type: String, default: '🏅' },
    xpBonus: { type: Number, default: 50, min: 0 },
    order: { type: Number, default: 0 },
    missionCode: { type: String, default: null }
  },
  { timestamps: true }
);

export const Badge = model<BadgeDocument, Model<BadgeDocument>>('Badge', badgeSchema);
