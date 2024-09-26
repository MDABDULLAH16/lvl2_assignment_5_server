// user.validation.ts
import { z } from 'zod';

const userCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z.string().min(1, 'Phone number is required'),
    role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
    address: z.string().min(1, 'Address is required'),
  }),
});

export const userValidationSchemas = {
  userCreateSchema,
};
