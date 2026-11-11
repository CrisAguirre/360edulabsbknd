import { Schema, model, type Model, Types } from 'mongoose';

export type QuestionType = 'single' | 'multiple' | 'true_false' | 'order';

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options: QuizOption[];
  correctAnswers: string[];
  feedback: string;
}

export interface QuizDocument {
  missionId: Types.ObjectId;
  title: string;
  passScore: number;
  maxAttempts: number;
  questions: QuizQuestion[];
  version: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const optionSchema = new Schema<QuizOption>(
  {
    id: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const questionSchema = new Schema<QuizQuestion>(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ['single', 'multiple', 'true_false', 'order'], default: 'single' },
    text: { type: String, required: true },
    options: { type: [optionSchema], default: [] },
    correctAnswers: { type: [String], default: [] },
    feedback: { type: String, default: '' }
  },
  { _id: false }
);

const quizSchema = new Schema<QuizDocument>(
  {
    missionId: { type: Types.ObjectId, ref: 'Mission', required: true, unique: true },
    title: { type: String, required: true },
    passScore: { type: Number, default: 70, min: 0, max: 100 },
    maxAttempts: { type: Number, default: 0, min: 0 },
    questions: { type: [questionSchema], default: [] },
    version: { type: Number, default: 1 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Quiz = model<QuizDocument, Model<QuizDocument>>('Quiz', quizSchema);
