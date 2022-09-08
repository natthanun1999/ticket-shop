import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { UserStampSchema } from 'src/common/userStamp.schema'
import { authorStampCreatePlugin } from 'src/database/author-stamp.plugin'

export type TicketHistoryDocument = TicketHistoryField & mongoose.Document

@Schema({ timestamps: true, strict: true ,collection: 'ticketHistories' })
export class TicketHistoryField {
  @Prop({ require: true })
  userId: string

  @Prop({ require: true })
  ticketId: number

  @Prop({ enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const TicketHistorySchema = SchemaFactory.createForClass(TicketHistoryField)
TicketHistorySchema.plugin(mongoosePaginate)
TicketHistorySchema.plugin(authorStampCreatePlugin)