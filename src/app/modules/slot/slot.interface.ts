import { Schema } from 'mongoose';

export type TSlot = {
  service: Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};
