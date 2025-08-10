
import dotenv from 'dotenv';
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

export default {
  // General
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  EMAIL: process.env.EMAIL,
  GOOGLE_EMAIL_APP_PASSWORD: process.env.GOOGLE_EMAIL_APP_PASSWORD,

  // Database
  DATABASE_URL: process.env.DATABASE_URL
}
export type TAppConfig = typeof import('./app.config').default;