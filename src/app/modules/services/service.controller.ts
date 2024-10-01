import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { serviceServices } from './service.service';

const crateService = catchAsync(async (req, res) => {
  const service = req.body;
  const result = await serviceServices.createServiceIntoDB(service);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service create Successfully',
    data: result,
  });
});

const getAllServiceReq = catchAsync(async (req, res) => {
  const result = await serviceServices.getAllServiceFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all services retrieved successfully',
    data: result,
  });
});
const getSingleServiceReq = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const result = await serviceServices.getSingleServiceFromDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateSingleServiceReq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const result = await serviceServices.updateSingleServiceIntoDB(_id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});
const deleteSingleServiceReq = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const result = await serviceServices.deleteSingleServiceIntoDB(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});
export const serviceController = {
  crateService,
  getAllServiceReq,
  getSingleServiceReq,
  updateSingleServiceReq,
  deleteSingleServiceReq,
};
