import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import AppError from '../../errors/AppError';

const createBooking = catchAsync(async (req, res) => {
  const { user } = req; // Assuming user is added to req from authentication middleware
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const serviceDetails = req.body;

  // Call the booking service to handle booking logic
  const booking = await BookingServices.createBooking(
    user.email,
    serviceDetails
  );

  // Send the successful booking response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: booking,
  });
});

const getAllBookingsReq = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Retrieved All Bookings',
    success: true,
    data: result,
  });
});

const getBookingsByUserReq = catchAsync(async (req, res) => {
  const { user } = req; // `user` should be added to the request by authentication middleware

  if (!user || !user.email) {
    throw new Error('User not authenticated');
  }

  const bookings = await BookingServices.getBookingsByUser(user.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: bookings,
  });
});

export const BookingsController = {
  createBooking,
  getAllBookingsReq,
  getBookingsByUserReq,
};
