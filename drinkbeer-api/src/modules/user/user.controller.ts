import { Controller, Param, Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UUIDParamDto } from '@common/dto/uuid-param.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers() {
        return await this.userService.getAllUsers();
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