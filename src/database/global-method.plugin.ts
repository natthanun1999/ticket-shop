import { Schema } from 'mongoose'

export const globalMethodPlugin = (schema: Schema) => {
  schema.method('setAuthor', function(request: any) {
    this._requestUser = request?.user
  })
}
