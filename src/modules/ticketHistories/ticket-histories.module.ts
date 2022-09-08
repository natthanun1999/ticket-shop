import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { TicketsModule } from '../tickets/tickets.module'
import { TicketHistoriesController } from './controllers/ticket-histories.controller'
import { TicketHistoriesLogic } from './logics/ticket-histories.logic'
import { TicketHistorySchema } from './models/ticket-histories.schema'
import { TicketHistoriesService } from './services/ticket-histories.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ticketHistories', schema: TicketHistorySchema }]),
    AuthModule,
    TicketsModule
  ],
  controllers: [TicketHistoriesController],
  providers: [
    TicketHistoriesService,
    TicketHistoriesLogic
  ]
})

export class TicketHistoriesModule {}
