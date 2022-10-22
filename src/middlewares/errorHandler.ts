import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { customError, ErrorTypes, StatusCodes } from '../errors/customError';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.issues });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = customError[messageAsErrorType];
  if (mappedError) {
    const { httpStatus, message } = mappedError;
    return res.status(httpStatus).json({ error: message });
  }

  console.error(err);
  return res.status(StatusCodes.INTERNAL_ERROR).json({ message: 'internal error' });
};

export default errorHandler;