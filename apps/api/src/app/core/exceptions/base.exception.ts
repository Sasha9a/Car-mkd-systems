import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException<T = any> extends HttpException {
  public constructor(message: Partial<Record<keyof T, string | string[]>> | string, statusCode: HttpStatus = HttpStatus.NOT_FOUND) {
    if (typeof message === 'object') {
      const errorObj = {
        statusCode: statusCode,
        message: message
      };
      super(errorObj, statusCode);
    } else {
      super(message, statusCode);
    }
  }
}
