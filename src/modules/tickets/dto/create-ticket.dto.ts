import { IsNumber, IsString } from 'class-validator'

export class CreateTicketDto {
  @IsString()
  userId: string

  @IsNumber()
  ticketId: number
}