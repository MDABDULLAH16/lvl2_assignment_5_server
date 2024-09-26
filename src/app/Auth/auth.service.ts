/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { User } from '../modules/user/user.model';
import { userServices } from '../modules/user/user.service';
import AppError from '../errors/AppError';
import config from '../config';

const loginUser = async (payload: TLoginUser) => {
  // Check if the user exists
  const user = await userServices.isUserExistIntoDB(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Create JWT payload
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // Generate access and refresh tokens
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.expire_in_access as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.expire_in_refresh as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // Verify the refresh token
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Invalid or expired refresh token'
    );
  }

  const { email, iat } = decoded;

  // Check if the user exists
  const user = await userServices.isUserExistIntoDB(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // Create a new access token
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.expire_in_access as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
