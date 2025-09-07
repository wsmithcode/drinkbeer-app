import { Controller, Post, Body } from '@nestjs/common'
import { LoginPayloadDto } from './dto/loginPayload.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

    constructor (private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginPayloadDto: LoginPayloadDto) {
        return await this.authService.validate(loginPayloadDto)
    }

}