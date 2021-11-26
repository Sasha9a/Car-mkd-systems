import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const result = `[${context.switchToHttp().getRequest<Request>().method} ${context.switchToHttp().getRequest<Request>().url}] StatusCode: ${context.switchToHttp().getResponse<Response>().statusCode}
    ${context.switchToHttp().getRequest<Request>().body ? JSON.stringify(context.switchToHttp().getRequest<Request>().body) : ''}`;
    return next.handle().pipe(tap(() => console.log(result)));
  }
}
