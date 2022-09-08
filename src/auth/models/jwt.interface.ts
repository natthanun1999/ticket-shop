export interface JwtPayload {
  name: string
  picture: string
  role: string
  email: string
  email_verified: boolean
  uid: string
  permissions?: any
  isOwner?: boolean
  iat?: number
  exp?: number
}
