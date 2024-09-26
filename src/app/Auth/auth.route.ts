import express from 'express';

import { AuthValidation } from './auth.validation';
import validateRequest from '../middlewares/validateRequest';
import { loginUser, refreshToken } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  refreshToken
);

export const AuthRoutes = router;
