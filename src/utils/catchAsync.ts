import { Request, Response, NextFunction } from "express";
import { ApiError } from "./apiError";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: ApiError | Error) => {
      const errorObject = {
        status: 500,
        message: err.message,
        stack: err.stack,
      };
      if (err instanceof ApiError) {
        errorObject.status = err.statusCode;
      }
      next(err);
    });
  };

export default catchAsync;
