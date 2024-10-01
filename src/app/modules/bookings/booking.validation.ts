import { z } from 'zod';
import { Types } from 'mongoose';

const objectIdValidation = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  });

const vehicleTypeEnum = [
  'car',
  'truck',
  'SUV',
  'van',
  'motorcycle',
  'bus',
  'electricVehicle',
  'hybridVehicle',
  'bicycle',
  'tractor',
] as const;

export const createBookingSchema = z.object({
  customer: z.string(),
  service: objectIdValidation,
  slot: objectIdValidation,
  vehicleType: z.enum(vehicleTypeEnum),
  vehicleBrand: z.string().min(1),
  vehicleModel: z.string().min(1),
  manufacturingYear: z.number().min(1886).max(new Date().getFullYear()),
  registrationPlate: z
    .string()
    .regex(/^[A-Z0-9-]+$/, 'Invalid registration plate format'),
});
