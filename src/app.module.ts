import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ErrorFilter } from './exception-filter/error.filter'
import { HttpExceptionFilter } from './exception-filter/http-exception.filter'
import { MongooseTransformers } from './interceptors/mongoose.transformer'
import { TransformInterceptor } from './interceptors/transfromer.interceptor'
import { AdminsModule } from './modules/admins/admins.module'
import { TicketsModule } from './modules/tickets/tickets.module'
import { TicketHistoriesModule } from './modules/ticketHistories/ticket-histories.module'
import { UsersModule } from './modules/users/users.module'
import { CamelizeKeysPipe } from './pipe/camelize-key.pipe'
import { CustomValidationPipe } from './pipe/custom-validation.pipe'

const AppProviders = [
  {
    provide: APP_PIPE,
    useClass: CamelizeKeysPipe
  },
  {
    provide: APP_PIPE,
    useClass: CustomValidationPipe
  },
  {
    provide: APP_FILTER,
    useClass: ErrorFilter
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformInterceptor
  },
  MongooseTransformers
]

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    AdminsModule,
    TicketsModule,
    TicketHistoriesModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [...AppProviders],
})
export class AppModule {}
