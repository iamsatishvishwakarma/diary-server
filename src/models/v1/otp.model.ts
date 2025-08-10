import mongoose, { Document, Schema } from 'mongoose';

export interface OtpDocument extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<OtpDocument>(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 600,
    },
  },
  { timestamps: false }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export const Otp = mongoose.model<OtpDocument>('Otp', otpSchema);
