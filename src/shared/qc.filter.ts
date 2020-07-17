import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { QuickCrudException } from 'quick-crud/dist/utils/QuickCrudError';

@Catch(QuickCrudException)
export class QCExceptionFilter implements ExceptionFilter {
  catch(exception: QuickCrudException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
