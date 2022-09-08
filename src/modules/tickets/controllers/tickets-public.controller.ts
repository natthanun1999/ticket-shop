import { Controller, Get, Query } from '@nestjs/common'
import { TicketQuery } from '../dto/paginate-ticket.dto'
import { TicketsService } from '../services/tickets.service'

@Controller('public/tickets')
export class TicketsPublicController {
  constructor (
    private readonly ticketService: TicketsService
  ) {}

  @Get()
  async getAllTickets (@Query() query: TicketQuery): Promise<any> {
    return this.ticketService.paginate(query.buildQuery(), query)
  }
}
