import { Request, Response, NextFunction } from 'express';
import httpError from '../utils/httpError';
import applicationRequestContent from '../constants/application-request.content';
import httpErrorResponse from '../utils/httpErrorResponse';

export const allowContentType = (type: string = applicationRequestContent.APPLICATION_JSON) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes(type)) {
      return httpError(next, new Error(`Only ${type} content-type is allowed`), req, 415);
    }

    next();
  }
};
