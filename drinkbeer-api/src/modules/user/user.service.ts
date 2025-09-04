import { Injectable, NotFoundException } from '@nestjs/common';    
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from 'src/utils/prisma-error.handler';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    getAllUsers() {
        try {
            return this.prisma.user.findMany()
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({ where: {id}})
            return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true})
        } catch (error) {
            handlePrismaError(error, {id, model: error.meta.modelName})
        }
    }
}