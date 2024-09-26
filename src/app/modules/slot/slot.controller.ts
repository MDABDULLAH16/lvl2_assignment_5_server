// Your utility to send responses
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { slotServices } from './slot.service';
import mongoose from 'mongoose';

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
  const { serviceId, date } = req.query;
  console.log(serviceId, date);
  // Check if serviceId is a valid MongoDB ObjectId
  if (serviceId && !mongoose.isValidObjectId(serviceId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID',
      errorSources: [
        {
          path: 'service',
          message: `Invalid serviceId: "${serviceId}". Please provide a valid MongoDB ObjectId.`,
        },
      ],
    });
  }
  // if (!serviceId || !date) {
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Please provide both serviceId and date.',
  //   });
  // }

  const availableSlots = await slotServices.findAvailableSlots2(
    date as string,
    serviceId as string
  );

  // if (availableSlots.length === 0) {
  //   return res.status(404).json({
  //     success: false,
  //     message: 'No available slots found for the given date and service.',
  //   });
  // }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Available slots found',
    data: availableSlots,
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
export const slotController = {
  getAllSlotReq,
  createSlotReq,

  getAvailableSlot2,
};
