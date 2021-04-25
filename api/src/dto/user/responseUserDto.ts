import { ROLE } from '../../enums/roleAuthority.enum';
import { ObjectId } from 'mongoose';
import {User} from "../../schemas/user.schema";
import {Exclude, Expose, Type} from "class-transformer";

@Expose()
export class ResponseUserDto {
    _id?: string | ObjectId;
    userName?: string;
    firstName?: string;
    lastName?: string;
    @Exclude()
    password?: string;
    email?: string;
    disabled?: boolean;
    deleted?: boolean;
    role?: ROLE;

    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial);
    }
}

export class ResponseUsersDto {
    constructor(
        public users: ResponseUserDto[]
    ) {}
}
