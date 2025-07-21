import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import config from "./../config/config";

export const generateJwtToken = (user: IUser): string => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "1m" }
  );
  return token;
};

export const generateRefreshToken = (
  user: IUser,
  JWT_SECRET: string
): string => {
  return jwt.sign({ userId: user._id }, JWT_SECRET + "_refresh", {
    expiresIn: "2m",
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
};

export const verifyRefreshToken = (
  token: string,
  JWT_SECRET: string
): JwtPayload => {
  return jwt.verify(token, JWT_SECRET + "_refresh") as JwtPayload;
};
