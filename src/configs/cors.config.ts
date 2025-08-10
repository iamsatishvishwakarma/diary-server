import cors, { CorsOptions } from 'cors';
import config from './app.config';
import { EApplicationEnvironment } from '../constants/application.constant';

const allowedOrigins = config.NODE_ENV === EApplicationEnvironment.PRODUCTION
  ? config.ALLOWED_ORIGINS?.split(',') // from .env as comma-separated list
  : ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

export default cors(corsOptions);
