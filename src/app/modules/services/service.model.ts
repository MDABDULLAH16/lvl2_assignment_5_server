import { model, Schema } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Service = model<TService>('Service', serviceSchema);

// validation schema
import { z } from 'zod';

// Zod schema for creating a new service
export const createServiceSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  price: z.number().min(0, 'Price must be a non-negative number'),
  duration: z.number().min(0, 'Duration must be a non-negative number'),
  isDeleted: z.boolean().optional(), // Optional, defaults to false in the model
});

// Zod schema for updating a service (all fields are optional)
export const updateServiceSchema = createServiceSchema.partial();
