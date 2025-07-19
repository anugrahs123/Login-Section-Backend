import mongoose from "mongoose";
import httpStatus from "http-status";
import { ApiError } from "../utils/apiError";
import { Request, Response, NextFunction } from "express";

// Error Converter Middleware
const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;
  console.log(
    "###################################Error in errorConverter##################",
    error
  );

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// Error Handler Middleware
const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode, message } = err;
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).json(response);
};

export { errorConverter, errorHandler };
