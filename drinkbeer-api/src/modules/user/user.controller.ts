import { Controller, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UUIDParamDto } from '@common/dto/uuid-param.dto';

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

}