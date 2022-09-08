import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { CreateUserDto } from '../dto/create-user.dto'
import { UserQuery } from '../dto/paginate-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDocument } from '../models/users.schema'

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: PaginateModel<UserDocument | any>,
    @Inject(REQUEST)
    private readonly request: any
  ) {}

  async find(condition: any): Promise<UserDocument[]> {
    return this.userModel.find(condition)
  }

  async findOne(condition: any): Promise<UserDocument | any> {
    return this.userModel.findOne(condition)
  }

  async createOne(create: CreateUserDto): Promise<UserDocument> {
    const created = new this.userModel(create)
    created?.setAuthor(this.request)

    return created.save()
  }

  async updateOne(condition: any, payload: UpdateUserDto): Promise<UserDocument> {
    const doc = await this.findOne(condition)
    doc?.setAuthor(this.request)

    return doc.set({ ...payload }).save()
  }

  async deleteOne(id: string): Promise<UserDocument> {
    const document = await this.findOne({ _id: id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  paginate(query, queryParam: UserQuery): Promise<PaginateResult<UserDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder }
    }

    return this.userModel.paginate(query, options)
  }
}
