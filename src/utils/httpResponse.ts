import { Request, Response } from 'express'
import { THttpResponse } from '../types/http'
import config from '../configs/app.config'
import { EApplicationEnvironment } from '../constants/application.constant'
import logger from './logger'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }

    // Development Env check
    if (config.NODE_ENV === EApplicationEnvironment.DEVELOPMENT) {
        logger.info(`CONTROLLER_RESPONSE`, {
            meta: response
        })
    }

    // Production Env check
    if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
