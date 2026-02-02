import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';

const router = Router();
const studentController = new StudentController();

// We bind the methods to preserve 'this' context, or use arrow functions in controller class
router.post('/', studentController.create);
router.get('/', studentController.getAll);
router.get('/:id', studentController.getOne);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router;
