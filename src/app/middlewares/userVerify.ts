/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, config.jwt_access_secret as string);
    req.user = decoded as JwtPayload; // Store the decoded user info in req.user
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

export default authenticateUser;
