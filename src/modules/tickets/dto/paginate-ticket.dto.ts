import { IsOptional, IsString } from 'class-validator'
import { StatusEnum } from 'src/common/status.enum'
import { PaginateDto } from 'src/dto/paginate.dto'

export class TicketQuery extends PaginateDto {
  @IsOptional()
  @IsString()
  readonly sortBy: string = 'createdAt'

  @IsOptional()
  @IsString()
  readonly sortOrder: string = 'desc'

  @IsOptional()
  @IsString()
  readonly search: string = ''

  @IsOptional()
  @IsString()
  readonly status: string

  public buildQuery() {
    return {
      '$or': [
        {
          'name': {
            $regex: this.search, $options: 'i'
          }
        }
      ],
      'status': this.status || { $ne: StatusEnum.DELETED}
    }
  }
}
