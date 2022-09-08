import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { CreateAdminDto } from '../dto/create-admin.dto'
import { AdminQuery } from '../dto/paginate-admin.dto'
import { UpdateAdminDto } from '../dto/update-admin.dto'
import { AdminDocument } from '../models/admins.schema'

@Injectable({ scope: Scope.REQUEST })
export class AdminsService {
  constructor(
    @InjectModel('admins')
    private readonly adminModel: PaginateModel<AdminDocument | any>,
    @Inject(REQUEST)
    private readonly request: any
  ) {}

  async find(condition: any): Promise<AdminDocument[]> {
    return this.adminModel.find(condition)
  }

  async findOne(condition: any): Promise<AdminDocument | any> {
    return this.adminModel.findOne(condition)
  }

  async createOne(create: CreateAdminDto): Promise<AdminDocument> {
    const created = new this.adminModel(create)
    created?.setAuthor(this.request)

    return created.save()
  }

  async updateOne(condition: any, payload: UpdateAdminDto): Promise<AdminDocument> {
    const doc = await this.findOne(condition)
    doc?.setAuthor(this.request)

    return doc.set({ ...payload }).save()
  }

  async deleteOne(id: string): Promise<AdminDocument> {
    const document = await this.findOne({ _id: id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  paginate(query, queryParam: AdminQuery): Promise<PaginateResult<AdminDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder }
    }

    return this.adminModel.paginate(query, options)
  }
}
