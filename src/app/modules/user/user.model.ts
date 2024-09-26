import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

// Define the Mongoose Schema corresponding to the IUser interface
const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  address: { type: String, required: true },
});

export const User = model<TUser>('User', userSchema);
