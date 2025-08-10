import { Request, Response } from 'express'
import { THttpError } from '../types/http'
import config from '../configs/app.config'
import { EApplicationEnvironment } from '../constants/application.constant'
import logger from './logger'

export default (req: Request, res: Response, error: THttpError) => {
  const response: THttpError = error;

  // Development Env check
  if (config.NODE_ENV === EApplicationEnvironment.DEVELOPMENT) {
    logger.info(`CONTROLLER_ERROR_RESPONSE`, {
      meta: response
    })
  }

  // Production Env check
  if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
    delete response.request.ip
  }

  res.status(response.statusCode).json(response)
}
