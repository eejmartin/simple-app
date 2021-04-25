import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../dto/user/createUserDto';
import { UpdateUserDto } from '../../dto/user/updateUserDto';
import { User } from '../../schemas/user.schema';
import { EMPTY, EmptyError, from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { UserDto } from '../../dto/user/userDto';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LoginUserDto } from '../../dto/user/loginUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  findAll(): Observable<UserDto[]> {
    return from(this.userModel.find().exec()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  findAllDisabledFalse(): Observable<UserDto[]> {
    return from(this.userModel.find({ delete: false }).exec()).pipe(
      map((users: UserDto[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  findOne(userId: string): Observable<UserDto> {
    return from(this.userModel.findOne({ _id: userId }).exec()).pipe(
      map((user: UserDto) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findOneDeletedFalseDisabledFalse(userId: number): Observable<UserDto> {
    return from(
      this.userModel.findOne({ _id: userId, deleted: false }).exec(),
    ).pipe(
      map((user: UserDto) => {
        const { password, ...result } = user;
        return result;
      }),
    );
  }

  findOneByUsername(username: string): Observable<UserDto> {
    return from(
      this.userModel.findOne({ userName: username, deleted: false }),
    ).pipe(
      map((user: UserDto) => {
        if (user) {
          delete user.password;
          return user;
        } else {
          return new UserDto();
        }
      }),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(
      this.userModel.findOne({ email: email, deleted: false }).exec(),
    );
  }

  create(createUserDto: CreateUserDto): Observable<UserDto> {
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
          map((user: UserDto) => {
            delete user.password;
            return user;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }

  updateOne(userId: string, user: UpdateUserDto): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;

    return from(this.userModel.findOneAndUpdate({ _id: userId })).pipe(
      switchMap(() => this.findOne(userId)),
    );
  }

  updateRoleOfUser(userId: string, user: UpdateUserDto): Observable<any> {
    return from(this.userModel.findOneAndUpdate({ _id: userId }, user));
  }

  deleteOne(userId: string): Observable<any> {
    return from(this.userModel.findOneAndDelete({ _id: userId }));
  }

  validateUser(userValidate: LoginUserDto): Observable<UserDto> {
    return from(this.findOneByUsername(userValidate.userName)).pipe(
      switchMap((user: UserDto) => {
        if (user) {
          return this.authService
            .comparePasswords(userValidate.password, user.password)
            .pipe(
              map((match: boolean) => {
                if (match) {
                  const { password, ...result } = user;
                  return result;
                } else {
                  throw Error;
                }
              }),
            );
        } else {
          throw new EmptyError();
        }
      }),
      catchError((err) => throwError(err)),
    );
  }

  login(user: LoginUserDto): Observable<string> {
    return this.validateUser(user).pipe(
      switchMap((user: UserDto) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return EMPTY.pipe();
        }
      }),
    );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<UserDto>> {
    const skip = +options.page * +options.limit;
    return from(
      this.userModel
        .find({}, ['id', 'firstName', 'userName', 'email', 'role'], {
          skip: skip || 0,
          limit: +options.limit || 10,
        })
        .sort({ _id: 'ASC' })
        .exec(),
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
                totalUsers / +options.limit,
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
      }),
    );
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    user: string,
  ): Observable<Pagination<UserDto>> {
    const skip = +options.page * +options.limit;
    return from(
      this.userModel
        .find(
          { where: [{ userName: { $regex: '.*' + user + '.*' } }] },
          ['id', 'firstName', 'userName', 'email', 'role'],
          { skip: skip || 0, limit: +options.limit || 10 },
        )
        .sort({ _id: 'ASC' })
        .exec(),
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
                totalUsers / +options.limit,
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
      }),
    );
  }
}
