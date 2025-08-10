export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface OtpVerificationRequestBody {
  email: string;
  otp: string | number;
}