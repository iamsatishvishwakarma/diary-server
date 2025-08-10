import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request/authenticated-request.type';

export const appendUserAuditFields = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    if (authReq.user && authReq.user._id) {
      if (req.method === 'POST') {
        req.body.addedBy = authReq.user._id;
        req.body.updatedBy = authReq.user._id;
      } else if (req.method === 'PUT' || req.method === 'PATCH') {
        req.body.updatedBy = authReq.user._id;
      }
    }
    next();
  };
};
