import * as mongoose from 'mongoose'
import { Injectable } from '@nestjs/common'
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose'
import { globalMethodPlugin } from './global-method.plugin'

@Injectable()
export class MongooseOption implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    mongoose.plugin(globalMethodPlugin)
    mongoose.set('useFindAndModify', false)
    mongoose.set('toObject', {
      transform(doc: any, { _id, __v, id, ...filter }: any, options: any) {
        const filterId = _id || id

        if (!filterId) {
          return filter
        }

        filter.id = typeof filterId === 'object'
          ? String(filterId)
          : filterId

        return filter
      }
    })

    return {
      uri: process.env.MONGODB_URI,
      useNewUrlParser: true
    }
  }
}
