import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as dayjs from 'dayjs'
import { AuthService } from '../services/auth.service'
import { UserDocument } from 'src/modules/users/models/users.schema'

@Injectable()
export class AuthLogic {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  async validateUser(token: string): Promise<any> {
    const userData = this.jwtService.decode(token)

    return userData
  }

  async createToken(user: UserDocument): Promise<any> {
    if (!user) {
      throw new UnauthorizedException()
    }

    const accessToken = await this.authService.createToken(user.toObject())
    const expiresIn: any = dayjs().add(7, 'day')

    return {
      ...user.toObject(),
      expiresIn: new Date(expiresIn),
      accessToken
    }
  }
}
