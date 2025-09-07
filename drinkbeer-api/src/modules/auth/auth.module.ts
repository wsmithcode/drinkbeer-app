import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserService } from '@modules/user/user.service'
import { PrismaService } from '@modules/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d',
                },
            }),
            }),
    ],
    controllers: [AuthController],
    providers: [ AuthService, PrismaService, UserService]
})

export class AuthModule{}