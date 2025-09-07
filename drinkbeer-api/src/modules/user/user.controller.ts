import { Controller, Param, Query, Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UUIDParamDto } from '@common/dto/uuid-param.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(@Query() userFilterDto: UserFilterDto) {
        return await this.userService.getAllUsers(userFilterDto);
    }

    @Get(':id')
    async getUserById(@Param() params: UUIDParamDto) {
        return await this.userService.getUserById(params.id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto ) {
        return await this.userService.createUser(createUserDto)
    }

}