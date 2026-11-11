import { Schema, model, type Model } from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserDocument {
  username: string;
  passwordHash: string;
  role: UserRole;
  displayName: string;
  avatarKey: string;
  active: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student', index: true },
    displayName: { type: String, required: true, trim: true },
    avatarKey: { type: String, default: 'cito' },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const output = ret as unknown as Record<string, unknown>;
    delete output.passwordHash;
    delete output.__v;
    return output;
  }
});

export const User = model<UserDocument, Model<UserDocument>>('User', userSchema);
