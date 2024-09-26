/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { createToken } from '../Auth/auth.utils';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Log the Authorization header to see what's coming in
    console.log('Auth Header:', authHeader);

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Access token is missing or malformed');
    }

    // Extract the token by removing the 'Bearer ' prefix
    const accessToken = authHeader.split(' ')[1];

    // Log the extracted access token
    console.log('Access Token:', accessToken);

    // Verify the access token
    jwt.verify(
      accessToken,
      config.jwt_access_secret as string,
      (err: any, decoded: any) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            // Access token expired, check refresh token from cookies
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
              throw new AppError(401, 'Refresh token is missing');
            }

            // Verify the refresh token
            jwt.verify(
              refreshToken,
              config.jwt_refresh_secret as string,
              (refreshErr: any, refreshDecoded: any) => {
                if (refreshErr) {
                  throw new AppError(
                    403,
                    'Refresh token is invalid or expired'
                  );
                }

                // Create a new access token
                const newAccessToken = createToken(
                  { email: refreshDecoded.email, role: refreshDecoded.role },
                  config.jwt_access_secret as string,
                  config.expire_in_access as string
                );

                // Set the new access token in the cookie
                res.cookie('accessToken', `Bearer ${newAccessToken}`, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
                  sameSite: 'strict',
                });

                // Attach the decoded refresh token data to the request object
                req.user = refreshDecoded;
                next();
              }
            );
          } else {
            throw new AppError(403, 'Access token is invalid');
          }
        } else {
          // Token is valid, attach the decoded token data to the request object
          req.user = decoded;
          next();
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
