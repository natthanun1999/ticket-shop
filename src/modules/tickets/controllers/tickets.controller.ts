import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateTicketDto } from '../dto/create-ticket.dto'
import { TicketQuery } from '../dto/paginate-ticket.dto'
import { UpdateTicketDto } from '../dto/update-ticket.dto'
import { TicketDocument } from '../models/tickets.schema'
import { TicketsService } from '../services/tickets.service'

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor (
    private readonly ticketService: TicketsService
  ) {}

  @Get()
  async getAllTickets (@Query() query: TicketQuery): Promise<any> {
    return this.ticketService.paginate(query.buildQuery(), query)
  }

  @Post()
  async createTicket (@Body() body: CreateTicketDto): Promise<TicketDocument> {
    return this.ticketService.createOne(body)
  }

  @Get('/:id')
  async getTicketById (@Param('id') id: string): Promise<TicketDocument> {
    return this.ticketService.findOne({ _id: id })
  }

  @Patch('/:id')
  async updateTicketById (@Param('id') id: string, @Body() body: UpdateTicketDto): Promise<TicketDocument> {
    return this.ticketService.updateOne({ _id: id }, body)
  }

  @Delete('/:id')
  async deleteTicketById (@Param('id') id: string): Promise<TicketDocument> {
    return this.ticketService.deleteOne(id)
  }
}
