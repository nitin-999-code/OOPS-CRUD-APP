import Student, { IStudentDocument } from '../models/student.model';
import { IStudent } from '../interfaces/student.interface';

export class StudentRepository {
    async create(data: IStudent): Promise<IStudentDocument> {
        return await Student.create(data);
    }

    async findById(id: string): Promise<IStudentDocument | null> {
        return await Student.findById(id);
    }

    async findByEmail(email: string): Promise<IStudentDocument | null> {
        return await Student.findOne({ email });
    }

    async findAll(query: any, skip: number, limit: number): Promise<IStudentDocument[]> {
        return await Student.find(query).skip(skip).limit(limit);
    }

    async count(query: any): Promise<number> {
        return await Student.countDocuments(query);
    }

    async update(id: string, data: Partial<IStudent>): Promise<IStudentDocument | null> {
        return await Student.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IStudentDocument | null> {
        return await Student.findByIdAndDelete(id);
    }
}
