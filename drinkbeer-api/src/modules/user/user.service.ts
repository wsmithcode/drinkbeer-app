import { Injectable, NotFoundException } from '@nestjs/common';    
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from 'src/utils/prisma-error.handler';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { BuildUserWhereFilter } from './util/buildUserWhereFilter';
import { hashPassword } from 'src/utils/bycrpt.utils';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    getAllUsers(userFilterDto: UserFilterDto) {
        try {
            const userFilter = BuildUserWhereFilter(userFilterDto)

            return this.prisma.user.findMany({
                where: userFilter
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({ where: {id}})
            return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true})
        } catch (error) {
            handlePrismaError(error, {type: 'id', value: id, model: error.meta.modelName})
        }
    }

    async getUserByUsername(username: string): Promise<UserResponseDto> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({where: {username}})
            return plainToInstance(UserResponseDto, user, {excludeExtraneousValues: true})
        } catch (error) {
            handlePrismaError(error, {type: 'username', value: username, model: error.meta.modelName})
        }
    }

    async createUser({username, email, password}: CreateUserDto): Promise<UserResponseDto> {
        try {
            const hashedPassword = await hashPassword(password)
            const user = await this.prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword
                }
            })
            return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true})
        } catch (error) {
            handlePrismaError(error, {type: error.meta.target, model: error.meta.modelName})
        }
    }
}