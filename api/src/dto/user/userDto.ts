import { ROLE } from '../../enums/roleAuthority.enum';
import { ObjectId } from 'mongoose';

export class UserDto {
  _id?: string | ObjectId;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  disabled?: boolean;
  deleted?: boolean;
  role?: ROLE;
}
