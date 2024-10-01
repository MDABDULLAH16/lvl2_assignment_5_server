import { Service } from '../services/service.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (userEmail: string, bookingDetails: TBooking) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = bookingDetails;

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
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
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
  const user = await User.findOne({ email: userEmail });
  // Check if user exists
  if (!user) {
    throw new Error('User not found');
  }
  const result = await Booking.findOne(
    { customer: user._id },
    { customer: 0, __v: 0 }
  ).populate('service slot');
  return result;
};

export const BookingServices = {
  createBooking,
  getAllBookings,
  getBookingsByUser,
};
