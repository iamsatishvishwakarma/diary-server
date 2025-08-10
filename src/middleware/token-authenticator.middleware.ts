import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configs/app.config';
import httpError from '../utils/httpError';
import httpResponse from '../utils/httpResponse';
import globalErrorHandlerMiddleware from './globalErrorHandler.middleware';
import httpErrorResponse from '../utils/httpErrorResponse';

interface JwtPayload {
  _id: string;
  email: string;
  role: string;
  isAccountVerified: boolean;
}

export const authenticator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '') || false;

    if (!token) {
      return httpError(next, new Error('No token found'), req, 403);
    }

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string
    ) as JwtPayload;

    (req as any).user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.name === 'TokenExpiredError') {
        return httpError(next, new Error('Token has expired'), req, 403);
      } else {
        return httpError(next, new Error('Invalid token'), req, 403);
      }
    }
    return httpError(next, error, req);
  }
};


interface DecodedToken {
  _id: string;
  role: string;
  isAccountVerified: boolean;
}

export const authenticatorForWS = (
  token: string
): DecodedToken | null => {

  try {

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET as string
    ) as JwtPayload;

    return decoded;

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      if (error.name === 'TokenExpiredError') {
        return null;
      } else {
        return null;
      }
    }
    return null;
  }
};
