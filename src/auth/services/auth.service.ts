import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(token: string): Promise<any> {
    const userData = this.jwtService.decode(token)

    return userData
  }

  async createToken(createTokenDto): Promise<any> {
    const accessToken = this.jwtService.sign(createTokenDto)

    return accessToken
  }
}
