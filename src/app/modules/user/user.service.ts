import { TUser } from './user.interface';
import { User } from './user.model';
import { hashPassword } from '../../helpers/passwordHelper';

const isUserExistIntoDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const createUserIntoDB = async (payload: TUser) => {
  const Password = hashPassword(payload.password);
  payload.password = Password;

  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const updateUserOnDb = async (_id: string, payload: TUser) => {
  const result = await User.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const userServices = {
  createUserIntoDB,
  isUserExistIntoDB,
  getAllUserFromDB,
  updateUserOnDb,
};
