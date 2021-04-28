import {ROLE} from "../enums/role";

export class User {
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
  ) {
  }
}

export class Credentials {
  constructor(
    public userName: string,
    public password: string
  ) {
  }
}
