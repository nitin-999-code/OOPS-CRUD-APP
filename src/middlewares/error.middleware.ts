import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = err.message || 'Internal Server Error';

    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Handle Mongoose duplicate key error
    if ((err as any).code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Handle Mongoose CastError (invalid ID)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Resource not found or invalid ID';
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
