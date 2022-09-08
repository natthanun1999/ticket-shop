import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus
} from '@nestjs/common'

@Catch()
export class ErrorFilter implements ExceptionFilter {
  protected context
  protected message
  protected code = HttpStatus.INTERNAL_SERVER_ERROR

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    this.context = host.switchToHttp()
    this.message = error.message

    this.prepare(error)
    response.status(500).json({
      message: this.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url
    })
  }

  protected prepare(error) {
    console.log(error)
  }
}
