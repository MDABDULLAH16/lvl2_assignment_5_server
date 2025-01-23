import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdValidation = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  });

export const createBookingSchema = z.object({
  customer: z.string(),
  service: objectIdValidation,
  slot: objectIdValidation,
  serviceName: z.string().min(1),
  userName: z.string().min(1),
  email: z.string().min(1),
  price: z.number().min(1),
  time: z.string(),
});
