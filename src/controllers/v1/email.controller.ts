import { ClientSession } from "mongoose";
import { generateCode } from "../../utils/functions/random-code-generator";
import { otpTemplate } from "../../utils/functions/emailTemplate.util";
import { sendEmail } from "../../services/email.service";
import { saveOtp } from "../../services/database.services/v1/otp.service";

export async function sendOtpEmail(toEmail: string, name: string, session: ClientSession) {
  const OTP_CODE = generateCode(5);

  const emailSent = await sendEmail({
    to: toEmail,
    subject: "Your OTP Code",
    html: otpTemplate(name, OTP_CODE),
  });

  if (emailSent) {
    await saveOtp({ email: toEmail, otp: OTP_CODE, session });
  }

  return emailSent;
}
