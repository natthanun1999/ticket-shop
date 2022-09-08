import { Prop, Schema } from '@nestjs/mongoose'

@Schema({ strict: true, _id: false })
export class UserStampSchema {
  @Prop({ required: true })
  id: string

  @Prop({ required: true })
  email: string
}