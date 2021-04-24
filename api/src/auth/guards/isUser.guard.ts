import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UsersService } from '../../modules/users/users.service';
import { UserDto } from '../../dto/user/userDto';

@Injectable()
export class IsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: UserDto = request.user;

    return this.userService.findOne(user._id.toString()).pipe(
      map((user: UserDto) => {
        let hasPermission = false;

        if (user._id === params.id) {
          hasPermission = true;
        }

        return user && hasPermission;
      }),
    );
  }
}
