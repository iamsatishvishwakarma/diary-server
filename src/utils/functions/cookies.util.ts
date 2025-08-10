import { Response } from 'express';
import { EApplicationEnvironment } from '../../constants/application.constant';
import config from '../../configs/app.config';

/**
 * Sets access and refresh tokens as HTTP-only cookies.
 * @param res Express response object
 * @param accessToken JWT access token
 * @param refreshToken JWT refresh token
 */
export const setCookies = (
  res: Response,
  refreshToken: string,
): void => {
  const isProd = config.NODE_ENV === EApplicationEnvironment.PRODUCTION;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
