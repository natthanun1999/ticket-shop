import { IsOptional, IsString } from 'class-validator'

export class CreateAdminDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  @IsOptional()
  firstName: string

  @IsString()
  @IsOptional()
  lastName: string

  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  tel: string
}