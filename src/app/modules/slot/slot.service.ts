/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

// Service function to create slots
const createSlotIntoDB = async (
  serviceId: string,
  date: string,
  startTime: string,
  endTime: string,
  serviceDuration: number = 60
): Promise<TSlot[]> => {
  // Convert startTime and endTime to minutes
  const [startHour, startMinutes] = startTime.split(':').map(Number);
  const [endHour, endMinutes] = endTime.split(':').map(Number);
  const startTimeInMinutes = startHour * 60 + startMinutes;
  const endTimeInMinutes = endHour * 60 + endMinutes;

  // Calculate total duration in minutes
  const totalDuration = endTimeInMinutes - startTimeInMinutes;

  // Determine the number of slots
  const numberOfSlots = Math.floor(totalDuration / serviceDuration);

  // Generate slots
  const slots: TSlot[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTimeInMinutes = startTimeInMinutes + i * serviceDuration;
    const slotEndTimeInMinutes = slotStartTimeInMinutes + serviceDuration;

    // Convert back to "HH:MM" format
    const slotStartHour = Math.floor(slotStartTimeInMinutes / 60)
      .toString()
      .padStart(2, '0');
    const slotStartMin = (slotStartTimeInMinutes % 60)
      .toString()
      .padStart(2, '0');
    const slotEndHour = Math.floor(slotEndTimeInMinutes / 60)
      .toString()
      .padStart(2, '0');
    const slotEndMin = (slotEndTimeInMinutes % 60).toString().padStart(2, '0');

    const slot = {
      service: serviceId,
      date,
      startTime: `${slotStartHour}:${slotStartMin}`,
      endTime: `${slotEndHour}:${slotEndMin}`,
      isBooked: 'available',
    };

    // Save the slot in the database
    const savedSlot = await Slot.create(slot);
    slots.push(savedSlot);
  }

  return slots;
};

const getAllSlot = async () => {
  const result = await Slot.find();
  return result;
};
const findAvailableSlots2 = async (serviceId: string, date?: string) => {
  const query: any = {};

  // Add serviceId filter if provided
  if (serviceId) {
    query.service = new mongoose.Types.ObjectId(serviceId);
  }

  // Add date filter if provided
  if (date) {
    query.date = date;
  }

  // Only find slots that are not booked (e.g., available or canceled)
  query.isBooked = { $in: ['available', 'canceled'] };

  // Perform the database query to find the available slots
  const availableSlots = await Slot.find(query).populate('service');

  return availableSlots;
};
export const slotServices = {
  getAllSlot,
  createSlotIntoDB,

  findAvailableSlots2,
};
