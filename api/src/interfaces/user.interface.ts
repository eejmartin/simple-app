import { ROLE } from '../enums/roleAuthority.enum';
import { ObjectId } from 'mongoose';

export interface IUser {
  _id: string | ObjectId;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  deleted?: boolean;
  disabled?: boolean;
  role?: ROLE;
}
