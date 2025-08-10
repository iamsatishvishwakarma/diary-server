import jwt from 'jsonwebtoken';
import config from '../../configs/app.config';

interface JwtPayload {
  [key: string]: string | number | boolean;
}

export const generateTokens = (data: JwtPayload) => {
  const accessToken = jwt.sign(
    data,
    config.JWT_SECRET!,
    { expiresIn: '2d' }
  );

  const refreshToken = jwt.sign(
    data,
    config.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
