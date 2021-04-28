import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dto/user/loginUserDto';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../modules/users/users.service';
import {ResponseUserDto} from "../dto/user/responseUserDto";

@Controller('')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('login')
  login(@Body() user: LoginUserDto): Observable<Object> {
    return this.usersService.login(user).pipe(
      map((loggedUser: {jwt: string, user: ResponseUserDto}) => {
        return { access_token: loggedUser.jwt, user: loggedUser.user };
      }),
      catchError((err) => throwError(err)),
    );
  }
}
