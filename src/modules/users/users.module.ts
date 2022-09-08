import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { UsersController } from './controllers/users.controller'
import { UsersLogic } from './logics/users.logic'
import { UserSchema } from './models/users.schema'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersLogic
  ],
  exports: [UsersService]
})

export class UsersModule {}
