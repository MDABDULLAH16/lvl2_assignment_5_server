import { Service } from '../services/service.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (userEmail: string, bookingDetails: TBooking) => {
  const { serviceId, slotId, serviceName, userName, email, price, time } =
    bookingDetails;

  //   // Validate required fields
  if (!serviceId) {
    throw new Error('ServiceId is required');
  }
  if (!slotId) {
    throw new Error('SlotId is required');
  }

  // Fetch service details
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error('Service not found');
  }

  // Fetch slot details and ensure it’s available
  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked === 'booked') {
    throw new Error('Slot not available');
  }

  // Fetch user by email
  const customer = await User.findOne({ email: userEmail });

  if (!customer) {
    throw new Error('User not found');
  }

  // Create booking
  const booking = await Booking.create({
    customer: customer._id,
    service: serviceId,
    slot: slotId,
    serviceName,
    userName,
    email,
    price,
    time,
  });

  //   Mark slot as booked
  slot.isBooked = 'booked';
  await slot.save();

  //   Populate service and customer details in the response
  await booking.populate('customer', 'name email phone address');
  await booking.populate('service', 'name description price duration');
  await booking.populate('slot', 'date startTime endTime');
  return booking;
};

const getAllBookings = async () => {
  const result = await Booking.find();
  return result;
};

const getBookingsByUser = async (userEmail: string) => {
  // Fetch the user by email
  const user = await User.findOne({ email: userEmail });
  // console.log('Logged user:', user);

  // Check if the user exists
  if (!user) {
    throw new Error('User not found');
  }

  // Fetch all bookings for the user
  const result = await Booking.find(
    { customer: user._id }, // Match the user's ID
    { __v: 0 } // Exclude internal Mongoose fields
  )
    .populate('service', 'name description price duration') // Populate service details
    .populate('slot', 'date startTime endTime'); // Populate slot details

  // console.log('Expected result:', result);

  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
};
