import { Schema, model, type Model, Types } from 'mongoose';

export interface QuizAnswer {
  questionId: string;
  selected: string[];
  correct?: boolean;
}

export interface QuizAttemptDocument {
  quizId: Types.ObjectId;
  studentId: Types.ObjectId;
  attemptNumber: number;
  answers: QuizAnswer[];
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  submittedAt?: Date | null;
  durationSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new Schema<QuizAnswer>(
  {
    questionId: { type: String, required: true },
    selected: [{ type: String }],
    correct: { type: Boolean, default: undefined }
  },
  { _id: false }
);

const quizAttemptSchema = new Schema<QuizAttemptDocument>(
  {
    quizId: { type: Types.ObjectId, ref: 'Quiz', required: true, index: true },
    studentId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    attemptNumber: { type: Number, required: true },
    answers: { type: [answerSchema], default: [] },
    score: { type: Number, default: 0, min: 0 },
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    passed: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date, default: null },
    durationSeconds: { type: Number, default: 0 }
  },
  { timestamps: true }
);

quizAttemptSchema.index({ quizId: 1, studentId: 1, attemptNumber: 1 }, { unique: true });

export const QuizAttempt = model<QuizAttemptDocument, Model<QuizAttemptDocument>>('QuizAttempt', quizAttemptSchema);
