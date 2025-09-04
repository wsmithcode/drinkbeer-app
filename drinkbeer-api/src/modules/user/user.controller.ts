import { Controller, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.getUserById(id);
    }

}