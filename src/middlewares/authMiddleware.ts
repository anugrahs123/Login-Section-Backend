import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "./../config/config";
import catchAsync from "../utils/catchAsync";
import { ApiError } from "../utils/apiError";

export const verifyJwt = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(
        400,
        "Access Denied. No authentication token provided."
      );
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as {
        userId: string;
      };

      req.userId = decoded.userId;
    } catch (err: any) {
      throw new ApiError(401, "Session expired. Please login again");
    }

    if (!req.userId) {
      throw new ApiError(
        401,
        "User not authenticated. Please log in to continue."
      );
    }
    next();
  }
);

export default verifyJwt;
