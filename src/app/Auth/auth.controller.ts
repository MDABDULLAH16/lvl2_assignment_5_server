import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { userServices } from '../modules/user/user.service';
import catchAsync from '../utils/catchAsync';
import { checkPassword } from '../helpers/passwordHelper';
import { createToken } from './auth.utils';
import config from '../config';
import sendResponse from '../utils/sendResponse';
import { AuthServices } from './auth.service';

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const userInfo = await userServices.isUserExistIntoDB(email);
  if (!userInfo) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // Validate password
  const isPasswordValid = checkPassword(password, userInfo.password);
  if (!isPasswordValid) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  // Prepare token data
  const tokenData = {
    email: userInfo.email,
    role: userInfo.role,
  };
  const accessToken = `${createToken(
    tokenData,
    config.jwt_access_secret as string,
    config.expire_in_access as string // e.g., '15m'
  )}`;

  // Create the refresh token (long-lived)
  const refreshToken = `Bearer ${createToken(
    tokenData,
    config.jwt_refresh_secret as string, // Use a different secret for the refresh token
    config.expire_in_refresh as string // e.g., '7d'
  )}`;
  // Set the refresh token in an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'strict',
  });

  // Set the access token in an HTTP-only cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    maxAge: 15 * 60 * 1000, // 15 minutes
    sameSite: 'strict',
  });

  // Send the response with user info
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
      // refreshToken, // Optionally send the access token to the client
      userInfo,
    },
  });
});
export const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});
