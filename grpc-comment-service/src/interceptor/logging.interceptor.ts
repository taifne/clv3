import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('Request');
  private responseLogger = new Logger('Response');
  private errorLogger = new Logger('Error');
  private logFilePath = 'request.log';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.originalUrl;

    return next.handle().pipe(
      tap(data => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] Received ${method} request to ${url}`;
        this.logger.log(logMessage);
        this.logToFile(logMessage);
        const responseMessage = `[${timestamp}] Response for ${method} request to ${url}: Status ${context.switchToHttp().getResponse().statusCode} - Data ${JSON.stringify(data)}`;
        this.responseLogger.log(responseMessage);
        this.logToFile(responseMessage);
      }),
      catchError(error => {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] Error occurred for ${method} request to ${url}: ${error.message}`;
        this.errorLogger.error(errorMessage);
        this.logToFile(errorMessage);
        return throwError(error);
      }),
    );
  }

  private logToFile(message: string): void {
    fs.appendFileSync(this.logFilePath, `${message}\n`);
  }
}
