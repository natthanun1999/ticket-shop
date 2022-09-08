import { MongooseOption } from './mongoose.config'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CounterSchema } from './models/counter.schema'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseOption
    }),
    MongooseModule.forFeature([
      { name: 'Counter', schema: CounterSchema }
    ])
  ],
  providers: [],
  exports: []
})

export class DatabaseModule {}
