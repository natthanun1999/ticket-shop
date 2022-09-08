import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { TicketsPublicController } from './controllers/tickets-public.controller'
import { TicketsController } from './controllers/tickets.controller'
import { TicketSchema } from './models/tickets.schema'
import { TicketsService } from './services/tickets.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'tickets', schema: TicketSchema }]),
    AuthModule
  ],
  controllers: [
    TicketsController,
    TicketsPublicController
  ],
  providers: [TicketsService],
  exports: [TicketsService]
})

export class TicketsModule {}
