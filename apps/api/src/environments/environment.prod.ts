import { ConfigInterface } from '@car-mkd-systems/api/core/interfaces/config.interface';
import * as process from 'process';

export const environment: ConfigInterface = {
  production: true,
  secret: process.env.SECRECT || 'd2103dfe7288ccb50a4a7af9ff90ec52',
  expiresIn: Number(process.env.EXPIRES_IN) || 2592000,
  connection: {
    type: (process.env.DB_TYPE as any) || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'car_mkd_systems',
    synchronize: process.env.DB_SYNCHRONIZE ? Boolean(process.env.DB_SYNCHRONIZE) : false
  }
};
