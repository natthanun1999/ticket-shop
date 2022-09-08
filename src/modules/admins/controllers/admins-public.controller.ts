import { Body, Controller, Post } from '@nestjs/common'
import { AuthLogic } from 'src/auth/logics/auth.logic'
import { StatusEnum } from 'src/common/status.enum'
import { LoginAdminDto } from '../dto/login-admin.dto'
import { AdminsService } from '../services/admins.service'

@Controller('public/admins')
export class AdminsPublicController {
  constructor (
    private readonly adminService: AdminsService,
    private readonly authLogic: AuthLogic
  ) {}

  @Post('/login')
  async login (@Body() body: LoginAdminDto): Promise<any> {
    const user = await this.adminService.findOne({
      username: body.username,
      password: body.password,
      status: { $ne: StatusEnum.DELETED }
    })
    
    return this.authLogic.createToken(user)
  }
}
