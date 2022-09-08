import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

export const authorStampCreatePlugin = (schema) => {
  schema.pre('save', function (next) {
    let { id, email } = {
      id: '0',
      email: 'system'
    }
    try {
      const temp = JwtAuthGuard.getAuthorizedUser()
      id = temp?.id || '0'
      email = temp?.email || 'system'
    } catch (err) {
      console.log('Public')
    }
    this.updatedBy = { id, email }
    if (this.isNew) {
      this.createdBy = { id, email }
    }
    next()
  })

  schema.pre('findOneAndUpdate', function (next) {
    let { id, email } = {
      id: '0',
      email: 'system'
    }
    try {
      const temp = JwtAuthGuard.getAuthorizedUser()
      id = temp?.id || '0'
      email = temp?.email || 'system'
    } catch (err) {
      console.log('Public')
    }
    this.updatedBy = { id, email }
    next()
  })

  schema.pre('update', function (next) {
    let { id, email } = {
      id: '0',
      email: 'system'
    }
    try {
      const temp = JwtAuthGuard.getAuthorizedUser()
      id = temp?.id || '0'
      email = temp?.email || 'system'
    } catch (err) {
      console.log('Public')
    }
    this.updatedBy = { id, email }
    next()
  })

  schema.pre('updateOne', function (next) {
    let { id, email } = {
      id: '0',
      email: 'system'
    }
    try {
      const temp = JwtAuthGuard.getAuthorizedUser()
      id = temp?.id || '0'
      email = temp?.email || 'system'
    } catch (err) {
      console.log('Public')
    }
    this.updatedBy = { id, email }
    next()
  })
}
