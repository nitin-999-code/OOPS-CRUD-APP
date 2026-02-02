import express, { Application } from 'express';
import studentRoutes from './routes/student.routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/students', studentRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
