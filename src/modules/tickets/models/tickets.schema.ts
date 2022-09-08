import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { UserStampSchema } from 'src/common/userStamp.schema'
import { authorStampCreatePlugin } from 'src/database/author-stamp.plugin'
import { incrementPlugin } from 'src/database/increment.plugin'

export type TicketDocument = TicketField & mongoose.Document

@Schema({ timestamps: true, strict: true ,collection: 'tickets' })
export class TicketField {
  @Prop({ default: 0 })
  _id: number

  @Prop({ require: true })
  name: string

  @Prop({ default: '' })
  imageUrl: string

  @Prop({ default: 0 })
  amount: number

  @Prop({ enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const TicketSchema = SchemaFactory.createForClass(TicketField)
TicketSchema.plugin(mongoosePaginate)
TicketSchema.plugin(authorStampCreatePlugin)
TicketSchema.plugin(incrementPlugin, { id: 'tickets_seq', inc_field: '_id' })