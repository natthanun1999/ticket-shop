import { Injectable } from '@nestjs/common'
import { StatusEnum } from 'src/common/status.enum'
import { TicketsService } from 'src/modules/tickets/services/tickets.service'
import { CreateTicketHistoryDto } from '../dto/create-ticket-history.dto'
import { TicketHistoriesService } from '../services/ticket-histories.service'

@Injectable()
export class TicketHistoriesLogic {
  constructor (
    private readonly ticketService: TicketsService,
    private readonly ticketHistoryService: TicketHistoriesService
  ) {}

  async createTicketHistory (body: CreateTicketHistoryDto) {
    const ticket = await this.ticketService.findOne({ _id: body.ticketId, status: { $ne: StatusEnum.DELETED } })

    if (ticket && ticket.amount > 0) {
      return await this.ticketHistoryService.createOne(body)
    }

    throw Error('Ticket not enough!')
  }
}