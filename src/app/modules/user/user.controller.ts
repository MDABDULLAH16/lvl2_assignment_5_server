/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';
import { createToken } from '../../Auth/auth.utils';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  // const { email, role } = req.body;
  const result = await userServices.createUserIntoDB(req.body);

  // const tokenData = {
  //   email: email,
  //   role: role,
  // };

  // // Create the access token (short-lived)
  // const accessToken = createToken(
  //   tokenData,
  //   config.jwt_access_secret as string,
  //   config.expire_in_access as string // Shorter lifespan, e.g., '15m'
  // );

  // // Create the refresh token (long-lived)
  // const refreshToken = createToken(
  //   tokenData,
  //   config.jwt_refresh_secret as string, // You can use a different secret key for refresh tokens
  //   config.expire_in_refresh as string // Longer lifespan, e.g., '7d'
  // );

  // // Set the refresh token in an HTTP-only cookie
  // res.cookie('refreshToken', refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  //   sameSite: 'strict',
  // });

  // // Set the access token in an HTTP-only cookie
  // res.cookie('accessToken', accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
  //   sameSite: 'strict',
  // });

  // Send response with user data (consider sending the access token if needed)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
