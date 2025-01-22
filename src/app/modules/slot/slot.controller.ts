// Your utility to send responses
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { slotServices } from './slot.service';
import mongoose from 'mongoose';
// import mongoose from 'mongoose';

// Controller function to create slots
const createSlotReq = catchAsync(async (req, res) => {
  const { service, date, startTime, endTime } = req.body;
  const serviceDuration = 60; // Set the service duration, or retrieve it from the database if needed

  // Call the service to create slots
  const slots = await slotServices.createSlotIntoDB(
    service,
    date,
    startTime,
    endTime,
    serviceDuration
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: slots,
  });
});
const getAvailableSlot2 = catchAsync(async (req, res) => {
  const { date, serviceId } = req.query;

  // Check if both serviceId and date are provided
  // if (!serviceId || !date) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Please provide both serviceId and date.',
  //   });
  // }

  // Check if serviceId is a valid MongoDB ObjectId
  if (!mongoose.isValidObjectId(serviceId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid serviceId. Please provide a valid MongoDB ObjectId.',
      errorSources: [
        {
          path: 'service',
          message: `Invalid serviceId: "${serviceId}".`,
        },
      ],
    });
  }

  // Call the service layer to get available slots
  const availableSlots = await slotServices.findAvailableSlots2(
    serviceId as string,
    date as string
  );

  // If no available slots found, return 404
  if (availableSlots.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No available slots found for the given date and service.',
    });
  }

  // Respond with available slots
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Available slots found',
    data: availableSlots,
  });
});
const getSingleSlotWithServiceIdReq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await slotServices.getSingleSlot(_id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all slot for this service',
    data: result,
  });
});
const getAllSlotReq = catchAsync(async (req, res) => {
  const result = await slotServices.getAllSlot();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all slots are retrieved',
    data: result,
  });
});
const updateSingleSlotReq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const result = await slotServices.updateSingleSlotIntoDB(_id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SLot updated successfully',
    data: result,
  });
});
export const slotController = {
  getAllSlotReq,
  createSlotReq,
  getSingleSlotWithServiceIdReq,
  getAvailableSlot2,
  updateSingleSlotReq,
};
