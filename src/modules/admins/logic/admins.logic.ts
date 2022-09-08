import { Injectable } from '@nestjs/common'
import { StatusEnum } from 'src/common/status.enum'
import { CreateAdminDto } from '../dto/create-admin.dto'
import { AdminDocument } from '../models/admins.schema'
import { AdminsService } from '../services/admins.service'

@Injectable()
export class AdminsLogic {
  constructor(
    private readonly adminsService: AdminsService
  ) {}

  async createAdmin(body: CreateAdminDto): Promise<AdminDocument> {
    const admin = await this.adminsService.findOne({
      username: body.username,
      status: StatusEnum.ACTIVE
    })

    if (admin) {
      throw Error('Username already exit.')
    }

    return await this.adminsService.createOne(body)
  }
}