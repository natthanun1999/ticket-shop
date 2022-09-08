import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { AuthLogic } from 'src/auth/logics/auth.logic'
import { StatusEnum } from 'src/common/status.enum'
import { CreateUserDto } from '../dto/create-user.dto'
import { LoginUserDto } from '../dto/login-user.dto'
import { UserQuery } from '../dto/paginate-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UsersLogic } from '../logics/users.logic'
import { UserDocument } from '../models/users.schema'
import { UsersService } from '../services/users.service'

@Controller('users')
export class UsersController {
  constructor (
    private readonly userService: UsersService,
    private readonly userLogic: UsersLogic,
    private readonly authLogic: AuthLogic
  ) {}

  @Get()
  async getAllUsers (@Query() query: UserQuery): Promise<any> {
    return this.userService.paginate(query.buildQuery(), query)
  }

  @Post()
  async createUser (@Body() body: CreateUserDto): Promise<UserDocument> {
    return this.userLogic.createUser(body)
  }

  @Post('/login')
  async login (@Body() body: LoginUserDto): Promise<any> {
    const user = await this.userService.findOne({
      username: body.username,
      password: body.password,
      status: { $ne: StatusEnum.DELETED }
    })
    
    return this.authLogic.createToken(user)
  }

  @Get('/:id')
  async getUserById (@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findOne({ _id: id })
  }

  @Patch('/:id')
  async updateUserById (@Param('id') id: string, @Body() body: UpdateUserDto): Promise<UserDocument> {
    return this.userService.updateOne({ _id: id }, body)
  }

  @Delete('/:id')
  async deleteUserById (@Param('id') id: string): Promise<UserDocument> {
    return this.userService.deleteOne(id)
  }
}
