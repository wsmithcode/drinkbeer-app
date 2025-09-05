import { Injectable, NotFoundException } from '@nestjs/common';    
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from 'src/utils/prisma-error.handler';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';

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

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.create({
                data: {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password: createUserDto.password
                }
            })
            return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true})
        } catch (error) {
            handlePrismaError(error)
        }
    }
}