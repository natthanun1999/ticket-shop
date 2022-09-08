import { IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @IsOptional()
  email: string

  @IsString()
  tel: string
}