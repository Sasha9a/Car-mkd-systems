import { BaseException } from '@car-mkd-systems/api/core/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateForm<T>(data: any, dto: any): T {
  const result: any = plainToInstance(dto, data);

  const errors = validateSync(result);

  if (errors.length > 0) {
    const message = {};
    errors.forEach((error) => {
      message[error.property] = Object.values(error.constraints)
        .map((error) => error)
        .join(', ');
    });
    throw new BaseException(result, HttpStatus.PRECONDITION_FAILED);
  }

  return result;
}
