/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { createServiceSchema, updateServiceSchema } from './service.model';
import AppError from '../../errors/AppError';

const validateCreateService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createServiceSchema.parse(req.body);
    next();
  } catch (error: any) {
    // Extracting error messages from Zod validation
    const validationErrors = error.errors
      ? error.errors.map((err: any) => err.message).join(', ')
      : 'Invalid data format';

    next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Validation failed: ${validationErrors}`
      )
    );
  }
};

const validateUpdateService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateServiceSchema.parse(req.body);
    next();
  } catch (error: any) {
    // Extracting error messages from Zod validation
    const validationErrors = error.errors
      ? error.errors.map((err: any) => err.message).join(', ')
      : 'Invalid data format';

    next(
      new AppError(
        httpStatus.BAD_REQUEST,
        `Validation failed: ${validationErrors}`
      )
    );
  }
};

export { validateCreateService, validateUpdateService };
