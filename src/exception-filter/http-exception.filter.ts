import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    let message = exception.message

    const res: any = exception.getResponse()
    if (res && res !== null && res.message) {
      message = res.message
    }
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    })
    // response.status(status).json({
    //   statusCode: status,
    //   message,
    //   timestamp: new Date().toISOString(),
    //   path: request.url
    // })
  }
}
