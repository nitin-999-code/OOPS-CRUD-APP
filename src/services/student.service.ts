import { StudentRepository } from '../repositories/student.repository';
import { IStudent } from '../interfaces/student.interface';
import { ApiError } from '../utils/ApiError';

export class StudentService {
    private studentRepository: StudentRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
    }

    async createStudent(data: IStudent) {
        const existingStudent = await this.studentRepository.findByEmail(data.email);
        if (existingStudent) {
            throw new ApiError(400, 'Email already exists');
        }
        return await this.studentRepository.create(data);
    }

    async getStudentById(id: string) {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        return student;
    }

    async getAllStudents(page: number, limit: number, search: string) {
        const skip = (page - 1) * limit;
        let query: any = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ],
            };
        }

        const students = await this.studentRepository.findAll(query, skip, limit);
        const total = await this.studentRepository.count(query);

        return {
            students,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async updateStudent(id: string, data: Partial<IStudent>) {
        const student = await this.studentRepository.update(id, data);
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        return student;
    }

    async deleteStudent(id: string) {
        const student = await this.studentRepository.delete(id);
        if (!student) {
            throw new ApiError(404, 'Student not found');
        }
        return student;
    }
}
