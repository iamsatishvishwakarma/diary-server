import { Request } from 'express';
import { IUser } from './user.type';
import { ClientSession } from 'mongoose';

export interface AuthenticatedRequest extends Request {
  user: IUser;
}

export interface MongoSessionRequest extends Request {
  session: ClientSession;
}