import { Schema, model, type Model, Types } from 'mongoose';

export interface ClassroomDocument {
  name: string;
  code: string;
  grade: string;
  school: string;
  academicYear: string;
  teacherIds: Types.ObjectId[];
  settings: {
    showClassGallery: boolean;
    allowRetries: boolean;
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const classroomSchema = new Schema<ClassroomDocument>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, minlength: 5, maxlength: 10 },
    grade: { type: String, default: '5.º de primaria' },
    school: { type: String, default: 'Institución educativa' },
    academicYear: { type: String, default: String(new Date().getFullYear()) },
    teacherIds: [{ type: Types.ObjectId, ref: 'User', required: true }],
    settings: {
      showClassGallery: { type: Boolean, default: false },
      allowRetries: { type: Boolean, default: true }
    },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

classroomSchema.index({ teacherIds: 1, active: 1 });

export const Classroom = model<ClassroomDocument, Model<ClassroomDocument>>('Classroom', classroomSchema);
