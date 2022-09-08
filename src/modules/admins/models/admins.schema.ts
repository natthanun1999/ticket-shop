import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { UserStampSchema } from 'src/common/userStamp.schema'
import { authorStampCreatePlugin } from 'src/database/author-stamp.plugin'

export type AdminDocument = AdminField & mongoose.Document

@Schema({ timestamps: true, strict: true, collection: 'admins' })
export class AdminField {
  @Prop({ required: true })
  username: string
  
  @Prop({ required: true })
  password: string

  @Prop({ default: '' })
  firstName: string

  @Prop({ default: '' })
  lastName: string

  @Prop({ default: '' })
  email: string

  @Prop({ default: '' })
  tel: string

  @Prop({ enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const AdminSchema = SchemaFactory.createForClass(AdminField)
AdminSchema.plugin(mongoosePaginate)
AdminSchema.plugin(authorStampCreatePlugin)