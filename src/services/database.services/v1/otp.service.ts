import { ClientSession } from "mongoose";
import { Otp } from "../../../models/v1/otp.model";
import { withSession } from "../../../types/express";
import { OtpVerificationRequestBody } from "../../../types/request/auth.types";

interface otpParameters extends OtpVerificationRequestBody, withSession { }

export const saveOtp = async ({ email, otp, session }: otpParameters): Promise<void> => {
  await Otp.create([{ email, otp }], { session });
};

export const verifyOtp = async ({ email, otp, session }: otpParameters): Promise<boolean> => {
  const record = await Otp.findOne({ email, otp }, null, { session });
  if (!record) return false;

  await deleteOtp(email, session);
  return true;
};

export const deleteOtp = async (email: string, session?: ClientSession): Promise<void> => {
  await Otp.deleteMany({ email }, { session });
};
