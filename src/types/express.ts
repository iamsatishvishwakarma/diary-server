import { Request, Response, NextFunction } from 'express';
import { ClientSession } from 'mongoose';

export type RequestWithSession<
  Params = any,
  ResBody = any,
  ReqBody = any,
  Query = any
> = Request<Params, ResBody, ReqBody, Query> & {
  session?: ClientSession;
};

export type ControllerHandler<
  Params = any,
  ResBody = any,
  ReqBody = any,
  Query = any
> = (
  req: RequestWithSession<Params, ResBody, ReqBody, Query>,
  res: Response,
  next: NextFunction
) => void;

export interface withSession {
  session?: ClientSession
}
