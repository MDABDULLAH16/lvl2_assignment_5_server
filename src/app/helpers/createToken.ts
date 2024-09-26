import jwt from 'jsonwebtoken';

export const createToken = (
  payload: string,
  secret: string,
  expireTime: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};
