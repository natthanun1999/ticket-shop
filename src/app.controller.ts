import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `TICKET SHOP API Mode : ${process.env.MODE}`
  }
}
