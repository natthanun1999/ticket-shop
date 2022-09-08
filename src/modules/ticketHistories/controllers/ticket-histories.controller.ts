import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateTicketHistoryDto } from '../dto/create-ticket-history.dto'
import { TicketHistoryQuery } from '../dto/paginate-ticket-history.dto'
import { UpdateTicketHistoryDto } from '../dto/update-ticket-history.dto'
import { TicketHistoriesLogic } from '../logics/ticket-histories.logic'
import { TicketHistoryDocument } from '../models/ticket-histories.schema'
import { TicketHistoriesService } from '../services/ticket-histories.service'

@UseGuards(JwtAuthGuard)
@Controller('ticket-histories')
export class TicketHistoriesController {
  constructor (
    private readonly ticketHistoryLogic: TicketHistoriesLogic,
    private readonly ticketHistoryService: TicketHistoriesService
  ) {}

  @Get()
  async getAllTicketHistories (@Query() query: TicketHistoryQuery): Promise<any> {
    return this.ticketHistoryService.paginate(query.buildQuery(), query)
  }

  @Post()
  async createTicketHistory (@Body() body: CreateTicketHistoryDto): Promise<TicketHistoryDocument> {
    return this.ticketHistoryLogic.createTicketHistory(body)
  }

  @Get('/:id')
  async getTicketHistoryById (@Param('id') id: string): Promise<TicketHistoryDocument> {
    return this.ticketHistoryService.findOne({ _id: id })
  }

  @Patch('/:id')
  async updateTicketHistoryById (@Param('id') id: string, @Body() body: UpdateTicketHistoryDto): Promise<TicketHistoryDocument> {
    return this.ticketHistoryService.updateOne({ _id: id }, body)
  }

  @Delete('/:id')
  async deleteTicketHistoryById (@Param('id') id: string): Promise<TicketHistoryDocument> {
    return this.ticketHistoryService.deleteOne(id)
  }
}
