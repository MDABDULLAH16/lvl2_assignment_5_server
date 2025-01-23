// / Define the TypeScript type for the Booking document

import { Types } from 'mongoose';

export type TBooking = {
  customer: Types.ObjectId;
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  serviceName: string;
  userName: string;
  email: string;
  price: number;
  time: string;
};
