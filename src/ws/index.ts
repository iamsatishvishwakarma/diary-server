import { Server as HTTPServer } from 'http';
import { WebSocketServer } from 'ws';
import { CustomWebSocket } from '../types/ws.type';
import { clients } from './clients';
import { parse } from 'url';
import { authenticatorForWS } from '../middleware/token-authenticator.middleware';
import logger from '../utils/logger';



export const initWebSocketServer = (server: HTTPServer) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    const customWs = ws as CustomWebSocket;
    const parsed = parse(req.url || '', true);

    const token = parsed.query.token as string;

    const decodedToken = authenticatorForWS(token)

    if (!decodedToken) {
      ws.close(1008, 'Unauthorized: No token provided');
      return;
    }

    const { _id: userId, role } = decodedToken;

    customWs.id = userId;
    customWs.role = role;

    clients.set(userId, customWs);

    ws.on('close', () => {
      clients.delete(userId);
    });

    ws.on('error', (error) => {
      clients.delete(userId)
      logger.error(`WS Error`, {
        meta: {
          error: error,
          source: 'WebSocket',
        }
      });
    });
  });

  wss.on('error', (error) => {
    logger.error(`WSS Error`, {
      meta: {
        error: error,
        source: 'WebSocket',
      }
    });
  });
};