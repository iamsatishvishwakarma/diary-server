import { NextFunction, Request, Response } from "express";
import { IUser, Role } from "../../types/request/user.type";
import { AuthenticatedRequest } from "../../types/request/authenticated-request.type";
import httpResponse from "../../utils/httpResponse";

export const isAccountVerified = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthenticatedRequest;

  if (!user.isAccountVerified) {
    return httpResponse(req, res, 403, 'Forbidden: Account not verified');
  }

  next();
};