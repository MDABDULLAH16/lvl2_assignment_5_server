import bcrypt from 'bcrypt';
export const hashPassword = (payload: string) => {
  return bcrypt.hashSync(payload, 8);
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
