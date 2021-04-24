import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEnum,
} from 'class-validator';
import { ROLE } from '../../enums/roleAuthority.enum';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  userName!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  disabled!: boolean;
  deleted!: boolean;

  @IsEnum(ROLE)
  role!: ROLE;
}
