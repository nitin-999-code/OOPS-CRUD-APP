import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { ApiError } from '../utils/ApiError';

export class StudentController {
    private studentService: StudentService;

    constructor() {
        this.studentService = new StudentService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, age, course } = req.body;

            if (!name || !email) {
                throw new ApiError(400, 'Name and Email are required');
            }

            const student = await this.studentService.createStudent({
                name,
                email,
                age,
                course,
                isActive: true,
            });

            res.status(201).json({
                success: true,
                data: student,
            });
        } catch (error) {
            next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = (req.query.search as string) || '';

            const result = await this.studentService.getAllStudents(page, limit, search);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            next(error);
        }
    };

    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const student = await this.studentService.getStudentById(id as string);

            res.status(200).json({
                success: true,
                data: student,
            });
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const student = await this.studentService.updateStudent(id as string, req.body);

            res.status(200).json({
                success: true,
                data: student,
            });
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.studentService.deleteStudent(id as string);

            res.status(200).json({
                success: true,
                message: 'Student deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    };
}
