import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { UserStampSchema } from 'src/common/userStamp.schema'
import { authorStampCreatePlugin } from 'src/database/author-stamp.plugin'

export type UserDocument = UserField & mongoose.Document

@Schema({ timestamps: true, strict: true, collection: 'users' })
export class UserField {
  @Prop({ required: true })
  username: string
  
  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ default: '' })
  email: string

  @Prop({ required: true })
  tel: string

  @Prop({ enum: Object.values(StatusEnum), default: StatusEnum.ACTIVE })
  status: string

  @Prop()
  updatedBy: UserStampSchema

  @Prop()
  createdBy: UserStampSchema
}

export const UserSchema = SchemaFactory.createForClass(UserField)
UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(authorStampCreatePlugin)