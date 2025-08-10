import express, { Application, NextFunction, Request, Response } from 'express';
import corsMiddleware from './configs/cors.config';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import responseMessage from './constants/responseMessage.constant';
import httpError from './utils/httpError';
import globalErrorHandlerMiddleware from './middleware/globalErrorHandler.middleware';

const app: Application = express();

// Middlewares
app.use(corsMiddleware);
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable('x-powered-by');

// Route
app.use('/api', routes);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

// Global Error Handler
app.use(globalErrorHandlerMiddleware)

export default app

