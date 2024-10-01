import express from 'express';
import { BookingsController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import authenticateUser from '../../middlewares/userVerify';

const router = express.Router();

// router.post('/slots', slotController.createSlotReq);
router.post(
  '/',
  authenticateUser,
  auth(USER_ROLE.user),
  BookingsController.createBooking
);
router.get(
  '/',

  auth(USER_ROLE.admin),
  BookingsController.getAllBookingsReq
);
router.get(
  '/my-bookings',
  //   authenticateUser,
  auth(USER_ROLE.user),
  BookingsController.getBookingsByUserReq
);

export const BookingsRoute = router;
