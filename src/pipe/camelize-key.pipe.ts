import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import * as humps from 'humps'

@Injectable()
export class CamelizeKeysPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      value = humps.camelizeKeys(value, (key, convert) => {
        return /^(_|[A-Z]+).*$/.test(key) ? key : convert(key)
      })
    }
    return value
  }
}
