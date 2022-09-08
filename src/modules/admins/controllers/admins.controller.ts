import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateAdminDto } from '../dto/create-admin.dto'
import { AdminQuery } from '../dto/paginate-admin.dto'
import { UpdateAdminDto } from '../dto/update-admin.dto'
import { AdminsLogic } from '../logic/admins.logic'
import { AdminDocument } from '../models/admins.schema'
import { AdminsService } from '../services/admins.service'

@UseGuards(JwtAuthGuard)
@Controller('admins')
export class AdminsController {
  constructor (
    private readonly adminLogic: AdminsLogic,
    private readonly adminService: AdminsService
  ) {}

  @Get()
  async getAllAdmins (@Query() query: AdminQuery): Promise<any> {
    return this.adminService.paginate(query.buildQuery(), query)
  }

  @Post()
  async createAdmin (@Body() body: CreateAdminDto): Promise<AdminDocument> {
    return this.adminLogic.createAdmin(body)
  }

  @Get('/:id')
  async getAdminById (@Param('id') id: string): Promise<AdminDocument> {
    return this.adminService.findOne({ _id: id })
  }

  @Get('/:username/username')
  async getAdminByUsername (@Param('username') username: string): Promise<AdminDocument> {
    return this.adminService.findOne({ username })
  }

  @Patch('/:id')
  async updateAdminById (@Param('id') id: string, @Body() body: UpdateAdminDto): Promise<AdminDocument> {
    return this.adminService.updateOne({ _id: id }, body)
  }

  @Delete('/:id')
  async deleteAdminById (@Param('id') id: string): Promise<AdminDocument> {
    return this.adminService.deleteOne(id)
  }
}
