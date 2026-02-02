import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

export interface IStudentDocument extends IStudent, Document { }

const StudentSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        course: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<IStudentDocument>('Student', StudentSchema);
