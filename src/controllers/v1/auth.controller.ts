import httpError from '../../utils/httpError'
import { ControllerHandler } from '../../types/express';
import { LoginRequestBody, OtpVerificationRequestBody } from '../../types/request/auth.types';
import { getUserByEmail, updateUserByEmail } from '../../services/database.services/v1/user.service';
import { generateTokens } from '../../utils/functions/token.util';
import { hashCompare } from '../../utils/hash';
import httpResponse from '../../utils/httpResponse';
import { setCookies } from '../../utils/functions/cookies.util';
import { verifyOtp } from '../../services/database.services/v1/otp.service';
import { ClientSession } from 'mongoose';
import { MongoSessionRequest } from '../../types/request/authenticated-request.type';

export const loginUserV1: ControllerHandler<{}, {}, LoginRequestBody> = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return httpResponse(req, res, 401, 'Invalid email or password');
    }

    // Compare passwords
    const isMatch = await hashCompare(password, user.password);
    if (!isMatch) {
      return httpResponse(req, res, 401, 'Invalid email or password');
    }

    const { password: _, refreshToken: ___, ...userOtherDetails } = user.toObject();

    // Generate JWT Token  
    const { refreshToken, accessToken } = generateTokens(userOtherDetails)

    user.refreshToken = refreshToken;
    await user.save()

    return httpResponse(req, res, 200, 'Login successful', { user: userOtherDetails, token: accessToken });
  } catch (error) {
    httpError(next, error, req)
  }
};

export const otpVerificationV1: ControllerHandler<{}, {}, {}> = async (req, res, next) => {
  try {
    const { email, otp } = req.body as OtpVerificationRequestBody;
    const session = req.session as MongoSessionRequest['session'];
    const isUserVerified = await verifyOtp({ email, otp, session });
    if (!isUserVerified) {
      return httpResponse(req, res, 404, 'Invalid or expired OTP');
    }
    const updatedUser = await updateUserByEmail(email, { isAccountVerified: true }, session);
    return httpResponse(req, res, 200, 'Account verified successfully', updatedUser);
  } catch (error) {
    return httpError(next, error, req)
  }
}