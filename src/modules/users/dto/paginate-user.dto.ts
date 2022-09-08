import { IsOptional, IsString } from 'class-validator'
import { StatusEnum } from 'src/common/status.enum'
import { PaginateDto } from 'src/dto/paginate.dto'

export class UserQuery extends PaginateDto {
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
          'firstName': {
            $regex: this.search, $options: 'i'
          }
        },
        {
          'lastName': {
            $regex: this.search, $options: 'i'
          }
        },
        {
          'email': {
            $regex: this.search, $options: 'i'
          }
        },
        {
          'tel': {
            $regex: this.search, $options: 'i'
          }
        }
      ],
      'status': this.status || { $ne: StatusEnum.DELETED }
    }
  }
}
