import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../dto/user/loginUserDto';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsersService } from '../modules/users/users.service';

@Controller('')
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('login')
  login(@Body() user: LoginUserDto): Observable<Object> {
    return this.usersService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
      catchError((err) => throwError(err)),
    );
  }
}
