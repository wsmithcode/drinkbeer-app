import { Injectable, NotFoundException } from '@nestjs/common';    
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from 'src/utils/prisma-error.handler';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    getAllUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(id: string) {
        try {
            return await this.prisma.user.findUniqueOrThrow({
            where: { id }
        })
        } catch (error) {
            handlePrismaError(error, {id, model: error.meta.modelName})
            throw error
        }
    }
}