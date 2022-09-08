import { IsNumber, IsString } from 'class-validator'

export class CreateTicketHistoryDto {
  @IsString()
  userId: string

  @IsNumber()
  ticketId: number
}