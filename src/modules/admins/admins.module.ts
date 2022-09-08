import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { AdminsPublicController } from './controllers/admins-public.controller'
import { AdminsController } from './controllers/admins.controller'
import { AdminsLogic } from './logic/admins.logic'
import { AdminSchema } from './models/admins.schema'
import { AdminsService } from './services/admins.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'admins', schema: AdminSchema }]),
    AuthModule
  ],
  controllers: [
    AdminsController,
    AdminsPublicController
  ],
  providers: [
    AdminsLogic,
    AdminsService
  ],
  exports: [AdminsService]
})

export class AdminsModule {}
