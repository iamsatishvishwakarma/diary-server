import { EApplicationConstants } from "../../constants/application.constant";

export function otpTemplate(name: string, otp: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #400358ff;">Your OTP Code</h2>
      <p>Hello, ${name}</p>
      <p>Please use the OTP code below to proceed:</p>
      <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #000;">
        ${otp}
      </div>
      <p>This code is valid for <strong>10 minutes</strong>.</p>
      <p>Thanks,<br/>The ${EApplicationConstants.APP_NAME} Team</p>
    </div>
  `;
}

export function accountConfirmedTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Account Verified ✅</h2>
      <p>Hello, ${name}</p>
      <p>Your account has been successfully verified. You can now log in and enjoy our services.</p>
      <p>Thanks,<br/>The ${EApplicationConstants.APP_NAME} Team</p>
    </div>
  `;
}
