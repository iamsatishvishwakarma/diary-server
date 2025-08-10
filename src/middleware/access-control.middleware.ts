import { NextFunction, Request, Response } from "express";
import { Role } from "../types/request/user.type";
import { AuthenticatedRequest } from "../types/request/authenticated-request.type";
import httpResponse from "../utils/httpResponse";

export const allowRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req as AuthenticatedRequest;

    if (!user.role) {
      return httpResponse(req, res, 403, 'Forbidden: No role assigned to user');
    }

    if (!allowedRoles.includes(user.role)) {
      return httpResponse(req, res, 403, `Forbidden: Role '${user.role}' not allowed`);
    }

    next();
  };
};