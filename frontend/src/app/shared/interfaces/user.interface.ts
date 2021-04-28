import {ROLE} from "../enums/role";

export interface IUser {
  _id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  deleted?: boolean;
  disabled?: boolean;
  role?: ROLE;
  token?: string
}
