import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types/request/user.type';

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user'
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      default: null
    },
    permissions: {
      type: [{
        resource: { type: String, required: true },
        actions: [{ type: String, required: true }]
      }],
      default: []
    },
    isAccountVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);