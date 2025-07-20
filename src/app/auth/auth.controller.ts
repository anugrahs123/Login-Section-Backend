import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as authService from "./auth.service";
import { validateLogin } from "./auth.validate";
import { ApiError } from "../../utils/apiError";

//login
export const login = catchAsync(async (req: Request, res: Response) => {
  validateLogin(req.body);
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.login(
    email,
    password
  );
  res.status(200).json({
    user,
    accessToken,
    refreshToken,
  });
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  const tokens = await authService.refreshAuthToken(refreshToken);
  res.status(200).json(tokens);
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const userId = req.body.userId;
  await authService.logout(userId, refreshToken);
  res.status(204).send();
});
export const userDetails = catchAsync(async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await authService.userDetails(userId);
  res.status(200).json(user);
});
