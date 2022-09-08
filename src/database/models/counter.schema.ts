import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type CounterDocument = CounterField & mongoose.Document

@Schema({ timestamps: true, strict: true, collection: 'counter', _id: false })
export class CounterField {
  @Prop({ required: true })
  _id: string

  @Prop({ default: 0 })
  seq: number
}

export const CounterSchema = SchemaFactory.createForClass(CounterField)
