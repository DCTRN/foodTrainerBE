import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedFilter implements ExceptionFilter {
  public catch(exception: UnauthorizedException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus() || 401;

    const errorMessage = this.createErrorMessage(status, request, exception);
    response.status(status).json(errorMessage);
    return errorMessage;
  }

  private createErrorMessage(
    status: number,
    request: any,
    exception: UnauthorizedException,
  ): any {
    return {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: {
        error: 'auth.unauthorized',
        errorDescription: exception.message,
      },
    };
  }
}
