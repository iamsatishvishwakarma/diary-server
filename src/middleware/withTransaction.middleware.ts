import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ControllerHandler, RequestWithSession } from '../types/express';

export function withTransaction(handler: ControllerHandler) {
  return async (req: RequestWithSession, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    req.session = session
    try {
      await handler(req, res, next);
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      logger.error('TRANSACTION_ERROR', { meta: err });
      if (!res.headersSent) {
        res.status(500).json({ message: 'Transaction failed', error: err });
      }
    } finally {
      session.endSession();
    }
  };
}
