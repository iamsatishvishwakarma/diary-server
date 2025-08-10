import { NextFunction, Request, Response } from 'express'
import config from '../configs/app.config'
import { EApplicationEnvironment } from '../constants/application.constant'
import { rateLimiterMongo } from '../configs/rateLimiter.config'
import httpError from '../utils/httpError'
import responseMessage from '../constants/responseMessage.constant'

export default (req: Request, _: Response, next: NextFunction) => {
    if (config.NODE_ENV === EApplicationEnvironment.DEVELOPMENT) {
        return next()
    }

    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next()
            })
            .catch(() => {
                httpError(next, new Error(responseMessage.TOO_MANY_REQUESTS), req, 429)
            })
    }
}
