import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards,} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from '../../dto/user/createUserDto';
import {UpdateUserDto} from '../../dto/user/updateUserDto';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {HasRoles} from '../../auth/decorators/role.decorators';
import {ROLE} from '../../enums/roleAuthority.enum';
import {RolesGuard} from '../../auth/guards/roles.guard';
import {catchError, map} from 'rxjs/operators';
import {Pagination} from 'nestjs-typeorm-paginate';
import {Observable, of} from 'rxjs';
import {UserDto} from '../../dto/user/userDto';
import {IsUserGuard} from '../../auth/guards/isUser.guard';
import {ResponseUserDto, ResponseUsersDto} from '../../dto/user/responseUserDto';
import {IUser} from "../../interfaces/user.interface";
import {plainToClass} from "class-transformer";
import {User} from "../../schemas/user.schema";
import {RegisterUserDto} from "../../dto/user/registerUserDto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    // getAllUsers

    @Get()
    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findAll(): Observable<ResponseUsersDto | any> {
        return this.usersService.findAll();
    }

    // peginate
    @Get('/paginate')
    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    index(
        @Req() request,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @Query('username') username: string
    ): Observable<Pagination<ResponseUserDto>> {
        limit = limit > 100 ? 100 : limit;
        const url = request.protocol + '://' + request.headers.host + request.path;
        if (!username) {
            return this.usersService.paginate({
                route: url,
                page: Number(page),
                limit: Number(limit),
            });
        } else {
            return this.usersService.paginateFilterByUsername(
                {
                    route: url,
                    page: Number(page),
                    limit: Number(limit),
                },
                username
            );
        }
    }

    @Get('/:id')
    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    findOne(@Param() params): Observable<ResponseUserDto> {
        return this.usersService.findOne(params.id);
    }

    @Get('/currentUser/:id')
    @UseGuards(JwtAuthGuard, IsUserGuard)
    getLoggedUser(@Param() params): Observable<ResponseUserDto> {
        return this.usersService.findOne(params.id);
    }

    @Post()
    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    create(@Body() user: CreateUserDto): Observable<ResponseUserDto | Object> {
        return this.usersService.create(user).pipe(
            map((user: ResponseUserDto) => user),
            catchError((err) => of({error: err.message}))
        );
    }

    @Put('/:id')
    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateOne(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Observable<any> {
        return this.usersService.updateOne(id, user);
    }

    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/role')
    updateRoleOfUser(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Observable<UserDto> {
        return this.usersService.updateRoleOfUser(id, user);
    }

    @Put('/currentUser/:id')
    @UseGuards(JwtAuthGuard, IsUserGuard)
    updateCurrentUser(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Observable<any> {
        return this.usersService.updateOne(id, user);
    }

    @HasRoles(ROLE.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string): Observable<any> {
        return this.usersService.deleteOne(id);
    }

    @Post('/register')
    registerUser(@Body() registerUser: RegisterUserDto): Observable<string> {
        return this.usersService.registerUser(registerUser);
    }
}
