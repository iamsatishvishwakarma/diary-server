import { NextFunction, Request, Response } from "express";
import { actions, IUser } from "../types/request/user.type";
import httpResponse from "../utils/httpResponse";

const hasPermission = (resource: string, action: actions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const perm = user?.permissions?.find(p => p.resource === resource);
    const allowed = !!perm && perm.actions.includes(action);

    if (!allowed) {
      return httpResponse(req, res, 403, `Permission denied: cannot ${action} on ${resource}`);
    }

    next();
  }
};

export default hasPermission;