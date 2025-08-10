import WebSocket from 'ws';
import { Role } from './request/user.type';

export interface CustomWebSocket extends WebSocket {
  id?: string;
  role?: Role | string;
}