declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production';
    SERVER_URL: string;
    ALLOWED_ORIGINS: string;
    JWT_REFRESH_SECRET: string;
    EMAIL: string;
    GOOGLE_EMAIL_APP_PASSWORD: string;
  }
}
