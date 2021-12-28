import { ConfigInterface } from '@car-mkd-systems/shared/interfaces/config.interface';

export const environment: ConfigInterface = {
  production: true,
  connection: {
    secret: process.env['SECRET'] || 'd2103dfe7288ccb50a4a7af9ff90ec52',
    db: process.env['DB'] || 'mongodb://localhost:27017/car',
    expiresIn: Number(process.env['EXPIRES_IN']) || 2592000
  }
};
