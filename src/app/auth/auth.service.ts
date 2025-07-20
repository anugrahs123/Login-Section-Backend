import RefreshToken from "../../models/token.model";
import User from "../../models/user.model";
import { ApiError } from "../../utils/apiError";
import {
  generateJwtToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/token";
import config from "./../../config/config";



export const login = async (identifier: string, password: string) => {
  const user = await User.findOne({ email: identifier, is_deleted: false });

  if (!user) {
    throw new ApiError(
      400,
      "The credentials you entered are incorrect. Please verify and try again."
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(400, "The email ID or password is incorrect.");
  }

  const accessToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, config.JWT_REFRESH_SECRET);
  const refreshTokenDoc = new RefreshToken({
    token: refreshToken,
    user: user._id,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  await refreshTokenDoc.save();
  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

export const refreshAuthToken = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken, config.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user || user.is_deleted) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Refresh token does not match.");
    }

    const newAccessToken = generateJwtToken(user);
    const newRefreshToken = generateRefreshToken(
      user,
      config.JWT_REFRESH_SECRET
    );
    const refreshTokenDoc = new RefreshToken({
      token: newRefreshToken,
      user: user._id,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    await refreshTokenDoc.save();

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.log(error);
    throw new ApiError(403, "Could not refresh token, token may be expired!");
  }
};

export const userDetails = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user || user.is_deleted) {
    throw new ApiError(401, "Invalid user ID.");
  }
  return user;
};

export const logout = async (userId: string, refreshToken: string) => {
  const tokenDoc = await RefreshToken.findOne({ token: refreshToken });

  if (!tokenDoc) {
    throw new ApiError(400, "Invalid refresh token.");
  }

  tokenDoc.revoked = true;
  await tokenDoc.save();
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;
  await user.save();
};
