import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config(); // Load environment variables from .env file

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'taidang',
  password: process.env.DB_PASSWORD || 'taidang123',
  database: process.env.DB_DATABASE || 'clv_jwat_taidang',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
