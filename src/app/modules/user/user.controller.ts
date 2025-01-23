import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const getAllUserFromDbReq = catchAsync(async (req, res) => {
  const result = await userServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all User retrieved successfully',
    data: result,
  });
});
const userUpdateReq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const result = await userServices.updateUserOnDb(_id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUserFromDbReq,
  userUpdateReq,
};
