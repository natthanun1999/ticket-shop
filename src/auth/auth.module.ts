import { Module, HttpModule, Global } from '@nestjs/common'
import { AuthLogic } from './logics/auth.logic'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './models/jwt-stategy'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './services/auth.service'

@Global()
@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'ticket',
      signOptions: {
        expiresIn: '7d'
      }
    })
  ],
  controllers: [],
  providers: [AuthService, AuthLogic, JwtStrategy],
  exports: [AuthLogic]
})
export class AuthModule {}
