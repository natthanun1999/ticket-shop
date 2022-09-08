import { IsOptional, IsNumberString, IsString } from 'class-validator'

export class PaginateDto {
  @IsOptional()
  @IsNumberString()
  readonly page: string = '1'

  @IsOptional()
  @IsNumberString()
  readonly limit: string = '25'

  @IsOptional()
  @IsString()
  readonly search: string = ''
}
