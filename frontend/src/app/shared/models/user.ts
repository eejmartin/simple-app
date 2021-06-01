import { ROLE } from '../enums/role';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
  constructor(
    public _id?: string,
    public userName?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public password?: string,
    public deleted?: boolean,
    public disabled?: boolean,
    public role?: ROLE,
    public token?: string
  ) {}
}

export class Credentials {
  constructor(public userName: string, public password: string) {}
}
