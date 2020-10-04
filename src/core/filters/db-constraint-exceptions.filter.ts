import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DbConstraintExceptionsFilter implements ExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const m = exception.message;
    const start = m.indexOf('"');
    const mssg = this.extractMessage(exception, start);
    const errorMessage = this.createErrorMessage(request, mssg);
    this.setErrorMessage(response, errorMessage);
    return errorMessage;
  }

  private setErrorMessage(response: any, errorMessage: any) {
    response.status(HttpStatus.BAD_REQUEST).json(errorMessage);
  }

  private createErrorMessage(request: any, mssg: string): any {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        error: 'db.constraint',
        errorDescription: mssg,
      },
    };
  }

  private extractMessage(exception: QueryFailedError, start: number) {
    return exception.message.slice(start + 1, exception.message.length - 1);
  }
}
