import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export default registerAs<AppConfig>('app', () => {
  return {
    nodeEnv: process.env.NODE_ENV || Environment.Development,
    name: process.env.APP_NAME || 'app',
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,

  };
});