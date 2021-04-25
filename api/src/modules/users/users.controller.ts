import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dto/user/createUserDto';
import { UpdateUserDto } from '../../dto/user/updateUserDto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { HasRoles } from '../../auth/decorators/role.decorators';
import { ROLE } from '../../enums/roleAuthority.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { catchError, map } from 'rxjs/operators';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, of } from 'rxjs';
import { UserDto } from '../../dto/user/userDto';
import { IsUserGuard } from '../../auth/guards/isUser.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // getAllUsers

  @Get()
  @UseGuards(JwtAuthGuard)
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('username') username: string,
  ): Observable<Pagination<UserDto>> {
    limit = limit > 100 ? 100 : limit;

    if (!username) {
      return this.usersService.paginate({
        page: Number(page),
        limit: Number(limit),
      });
    } else {
      return this.usersService.paginateFilterByUsername(
        {
          page: Number(page),
          limit: Number(limit),
        },
        username,
      );
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() params): Observable<UserDto> {
    return this.usersService.findOne(params.id);
  }

  @Post()
  @HasRoles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() user: CreateUserDto): Observable<UserDto | Object> {
    return this.usersService.create(user).pipe(
      map((user: UserDto) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, IsUserGuard)
  updateOne(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Observable<any> {
    return this.usersService.updateOne(id, user);
  }

  @HasRoles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Observable<UserDto> {
    return this.usersService.updateRoleOfUser(id, user);
  }

  @HasRoles(ROLE.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.usersService.deleteOne(id);
  }
}
