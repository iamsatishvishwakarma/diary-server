import { Document } from 'mongoose';
import { EUserRole } from '../../constants/application.user.constant';

export type actions = 'create' | 'read' | 'update' | 'delete';

export interface IUser extends Document {
  name: string;
  email: string;
  role: Role;
  password: string;
  permissions?: permission[];
  refreshToken?: string;
  isAccountVerified?: boolean;
}

export interface CurrentUserRequestBody {
  user: {
    _id: string;
  }
}


export interface permission {
  resource: string;
  actions: actions[];
}


export type Role = (typeof EUserRole)[keyof typeof EUserRole];
