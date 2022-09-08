import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel, PaginateResult } from 'mongoose-paginate'
import { StatusEnum } from 'src/common/status.enum'
import { CreateTicketDto } from '../dto/create-ticket.dto'
import { TicketQuery } from '../dto/paginate-ticket.dto'
import { UpdateTicketDto } from '../dto/update-ticket.dto'
import { TicketDocument } from '../models/tickets.schema'

@Injectable({ scope: Scope.REQUEST })
export class TicketsService {
  constructor(
    @InjectModel('tickets')
    private readonly ticketModel: PaginateModel<TicketDocument | any>,
    @Inject(REQUEST)
    private readonly request: any
  ) {}

  async find(condition: any): Promise<TicketDocument[]> {
    return this.ticketModel.find(condition)
  }

  async findOne(condition: any): Promise<TicketDocument | any> {
    return this.ticketModel.findOne(condition)
  }

  async createOne(create: CreateTicketDto): Promise<TicketDocument> {
    const created = new this.ticketModel(create)
    created?.setAuthor(this.request)

    return created.save()
  }

  async updateOne(condition: any, payload: UpdateTicketDto): Promise<TicketDocument> {
    const doc = await this.findOne(condition)
    doc?.setAuthor(this.request)

    return doc.set({ ...payload }).save()
  }

  async deleteOne(id: string): Promise<TicketDocument> {
    const document = await this.findOne({ _id: id })
    document?.setAuthor(this.request)

    return document.set({ status: StatusEnum.DELETED }).save()
  }

  paginate(query, queryParam: TicketQuery): Promise<PaginateResult<TicketDocument>> {
    const options = {
      page: Number(queryParam.page),
      limit: Number(queryParam.limit),
      sort: { [queryParam.sortBy]: queryParam.sortOrder }
    }

    return this.ticketModel.paginate(query, options)
  }
}
