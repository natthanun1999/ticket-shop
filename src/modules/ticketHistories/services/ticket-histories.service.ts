import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { CreateTicketHistoryDto } from '../dto/create-ticket-history.dto'
import { TicketHistoryQuery } from '../dto/paginate-ticket-history.dto'
import { UpdateTicketHistoryDto } from '../dto/update-ticket-history.dto'
import { TicketHistoryDocument } from '../models/ticket-histories.schema'

@Injectable({ scope: Scope.REQUEST })
export class TicketHistoriesService {
  constructor(
    @InjectModel('ticketHistories')
    private readonly ticketHistoryModel: PaginateModel<TicketHistoryDocument | any>,
    @Inject(REQUEST)
    private readonly request: any
  ) {}

  async find(condition: any): Promise<TicketHistoryDocument[]> {
    return this.ticketHistoryModel.find(condition)
  }

  async findOne(condition: any): Promise<TicketHistoryDocument | any> {
    return this.ticketHistoryModel.findOne(condition)
  }

  async createOne(create: CreateTicketHistoryDto): Promise<TicketHistoryDocument> {
    const created = new this.ticketHistoryModel(create)
    created?.setAuthor(this.request)

    return created.save()
  }

  async updateOne(condition: any, payload: UpdateTicketHistoryDto): Promise<TicketHistoryDocument> {
    const doc = await this.findOne(condition)
    doc?.setAuthor(this.request)

    return doc.set({ ...payload }).save()
  }

  async deleteOne(id: string): Promise<TicketHistoryDocument> {
    const document = await this.findOne({ _id: id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  paginate(query, queryParam: TicketHistoryQuery): Promise<PaginateResult<TicketHistoryDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder }
    }

    return this.ticketHistoryModel.paginate(query, options)
  }
}
