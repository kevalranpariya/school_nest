import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((data) =>
        data === undefined ||
        data === null ||
        (Array.isArray(data) && !data.length)
          ? {
              statusCode: HttpStatus.NOT_FOUND,
              message: 'Resource not found',
            }
          : {
              statusCode: response.statusCode,
              message: 'operation successfully done',
              data,
            },
      ),
    );
  }
}
