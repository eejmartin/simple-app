import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUserDto';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLE } from '../../enums/roleAuthority.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsEnum(ROLE)
  role?: ROLE;
}
