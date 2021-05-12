import {Injectable, UnauthorizedException,} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {CreateUserDto} from '../../dto/user/createUserDto';
import {UpdateUserDto} from '../../dto/user/updateUserDto';
import {User} from '../../schemas/user.schema';
import {from, Observable, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
import {UserDto} from '../../dto/user/userDto';
import {IPaginationOptions, Pagination} from 'nestjs-typeorm-paginate';
import {LoginUserDto} from '../../dto/user/loginUserDto';
import {ResponseUserDto, ResponseUsersDto} from "../../dto/user/responseUserDto";
import {plainToClass} from "class-transformer";
import {RegisterUserDto} from "../../dto/user/registerUserDto";
import {ROLE} from "../../enums/roleAuthority.enum";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly authService: AuthService
    ) {
    }

    findAll(): Observable<ResponseUsersDto> {
        return from(this.userModel.find().exec().then(users => {
            let res = [];
            users.forEach((user, i) => {
                const us = {...user['_doc']}
                const resUser = plainToClass(ResponseUserDto, us);
                res.push(resUser);
            })
            const usersArray = new ResponseUsersDto(res)
            return usersArray;
        }));
    }

    findAllDeletedFalse(): Observable<ResponseUsersDto> {
        return from(this.userModel.find({delete: false}).exec().then(users => {
                let res = [];
                users.forEach((user, i) => {
                    const userDoc = {...user['_doc']}
                    const resUser = plainToClass(ResponseUserDto, userDoc);
                    res.push(resUser);
                })
                const usersArray = new ResponseUsersDto(res)
                return usersArray;
            })
        );
    }

    findOne(userId: string): Observable<ResponseUserDto> {
        return from(this.userModel.findOne({_id: userId}).exec().then(user => {
            const userDoc = {...user['_doc']}
            return plainToClass(ResponseUserDto, userDoc);
        }));
    }

    findOneDeletedFalseDisabledFalse(userId: number): Observable<ResponseUserDto> {
        return from(
            this.userModel.findOne({_id: userId, deleted: false}).exec().then(user => {
                const userDoc = {...user['_doc']}
                return plainToClass(ResponseUserDto, userDoc);
            }));
    }

    findOneByUsername(username: string): Observable<ResponseUserDto> {
        return from(
            this.userModel.findOne({userName: username, deleted: false}).exec().then(user => {
                const userDoc = {...user['_doc']}
                return plainToClass(ResponseUserDto, userDoc);
            }));
    }

    findOneByUsernameWithPassword(username: string): Observable<UserDto> {
        return from(
            this.userModel.findOne({userName: username, deleted: false, disabled: false}).exec().then(user => {
                if (user) {
                    const userDoc = {...user['_doc']}
                    return plainToClass(UserDto, userDoc);
                } else {
                    return null;
                }
            }));
    }

    findByMail(email: string):
        Observable<ResponseUserDto> {
        return from(
            this.userModel.findOne({email: email, deleted: false}).exec().then(user => {
                const userDoc = {...user['_doc']}
                return plainToClass(ResponseUserDto, userDoc);
            }));
    }

    create(createUserDto: CreateUserDto):
        Observable<ResponseUserDto> {
        return this.authService.hashPassword(createUserDto.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserDto();
                newUser.userName = createUserDto.userName;
                newUser.firstName = createUserDto.firstName;
                newUser.lastName = createUserDto.lastName;
                newUser.email = createUserDto.email;
                newUser.role = createUserDto.role;
                newUser.password = passwordHash;
                newUser.disabled = createUserDto.disabled;
                newUser.deleted = createUserDto.deleted;
                const saveUser = new this.userModel(newUser);
                return from(saveUser.save()).pipe(
                    map((user: User) => {
                        const userDoc = {...user['_doc']}
                        return plainToClass(ResponseUserDto, userDoc);
                    }),
                    catchError((error) => throwError(error))
                );
            })
        );
    }

    registerUser(registerUsersDto: RegisterUserDto):
        Observable<string> {
        return this.authService.hashPassword(registerUsersDto.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserDto();
                newUser.userName = registerUsersDto.userName;
                newUser.firstName = registerUsersDto.firstName;
                newUser.lastName = registerUsersDto.lastName;
                newUser.email = registerUsersDto.email;
                newUser.role = ROLE.STUDENT;
                newUser.password = passwordHash;
                newUser.disabled = false;
                newUser.deleted = false;
                const saveUser = new this.userModel(newUser);
                return from(saveUser.save()).pipe(
                    map((user: User) => {
                        return JSON.stringify({data: 'Registration was accepted!'});
                    }),
                    catchError((err) => throwError(err))
                );
            })
        );
    }

    updateOne(userId: string, user: UpdateUserDto):
        Observable<any> {
        delete user.email;
        delete user.password;
        delete user.role;

        return from(this.userModel.findOneAndUpdate({_id: userId})).pipe(
            switchMap(() => this.findOne(userId))
        );
    }

    updateRoleOfUser(userId: string, user: UpdateUserDto):
        Observable<any> {
        return from(this.userModel.findOneAndUpdate({_id: userId}, user).exec().then(user => {
            const userDoc = {...user['_doc']}
            return plainToClass(ResponseUserDto, userDoc);
        }));
    }

    deleteOne(userId: string): Observable<any> {
        return from(this.userModel.findOneAndDelete({_id: userId}));
    }

    validateUser(userValidate: LoginUserDto): Observable<UserDto> {
        return from(this.findOneByUsernameWithPassword(userValidate.userName)).pipe(
            switchMap((user: UserDto) => {
                if (user) {
                    return this.authService
                        .comparePasswords(userValidate.password, user.password)
                        .pipe(
                            map((match: boolean) => {
                                if (match) {
                                    const {password, ...result} = user;
                                    return result;
                                } else {
                                    throw new UnauthorizedException();
                                }
                            })
                        );
                } else {
                    throw new UnauthorizedException();
                }
            }),
            catchError((err) => throwError(err))
        );
    }

    login(user: LoginUserDto): Observable<Object> {
        return this.validateUser(user).pipe(
            switchMap((user: UserDto) => {
                if (user) {
                    return this.authService
                        .generateJWT(user)
                        .pipe(map((jwt: string) => {
                            return {jwt: jwt, user: plainToClass(ResponseUserDto, user)}
                        }));
                } else {
                    return catchError((error) => throwError(error));
                }
            })
        );
    }

    paginate(options: IPaginationOptions): Observable<Pagination<ResponseUserDto>> {
        const skip = options.page == 1 ? 0 : +options.page * +options.limit;
        return from(
            this.userModel
                .find({}, ['id', 'firstName', 'userName', 'email', 'role'])
                .skip(skip)
                .limit(+options.limit || 10).sort({_id: 'ASC'})
                .exec()
        ).pipe(
            map(([...users]) => {
                const totalUsers = users.length;
                const usersPageable: Pagination<ResponseUserDto> = {
                    items: users,
                    links: {
                        first: options.route + `?limit=${options.limit}`,
                        previous: options.route + ``,
                        next:
                            options.route +
                            `?limit=${options.limit}&page=${+options.page + 1}`,
                        last:
                            options.route +
                            `?limit=${options.limit}&page=${Math.ceil(
                                totalUsers / +options.limit
                            )}`,
                    },
                    meta: {
                        currentPage: +options.page,
                        itemCount: users.length,
                        itemsPerPage: +options.limit,
                        totalItems: totalUsers,
                        totalPages: Math.ceil(totalUsers / +options.limit),
                    },
                };
                return usersPageable;
            })
        );
    }

    paginateFilterByUsername(options: IPaginationOptions, user: string): Observable<Pagination<ResponseUserDto>> {
        const skip = options.page == 1 ? 0 : +options.page * +options.limit;
        return from(
            this.userModel
                .find(
                    {where: [{userName: {$regex: '.*' + user + '.*'}}]},
                    ['id', 'firstName', 'userName', 'email', 'role'],
                    {skip: skip, limit: +options.limit || 10}
                )
                .sort({_id: 'ASC'})
                .exec()
        ).pipe(
            map(([...users]) => {
                const totalUsers = users.length;
                const usersPageable: Pagination<UserDto> = {
                    items: users,
                    links: {
                        first: options.route + `?limit=${options.limit}`,
                        previous: options.route + ``,
                        next:
                            options.route +
                            `?limit=${options.limit}&page=${+options.page + 1}`,
                        last:
                            options.route +
                            `?limit=${options.limit}&page=${Math.ceil(
                                totalUsers / +options.limit
                            )}`,
                    },
                    meta: {
                        currentPage: +options.page,
                        itemCount: users.length,
                        itemsPerPage: +options.limit,
                        totalItems: totalUsers,
                        totalPages: Math.ceil(totalUsers / +options.limit),
                    },
                };
                return usersPageable;
            })
        );
    }
}
