import { Injectable } from '@nestjs/common'
import { StatusEnum } from 'src/common/status.enum'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserDocument } from '../models/users.schema'
import { UsersService } from '../services/users.service'

@Injectable()
export class UsersLogic {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async createUser(body: CreateUserDto): Promise<UserDocument> {
    const user = await this.usersService.findOne({
      username: body.username,
      status: StatusEnum.ACTIVE
    })

    if (user) {
      throw Error('Username already exit.')
    }

    return await this.usersService.createOne(body)
  }
}