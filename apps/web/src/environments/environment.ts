import { ConfigInterface } from '@car-mkd-systems/web/core/interfaces/config.interface';

export const environment: ConfigInterface = {
  production: false,
  url: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/api'
};
