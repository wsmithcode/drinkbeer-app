import { BadRequestException, NotFoundException, ConflictException} from "@nestjs/common";
import { Prisma} from '@prisma/client'
import { AppErrors } from "src/constant/errors/error.message";

export function handlePrismaError(error: unknown, context?: {type: string, value?: string, model?: string}): never {
    if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

        const model = context?.model || 'unknown'
        const type = context?.type || 'unknown'
        const value = context?.value || 'unknown'


        switch (error.code ) {
            case 'P2025' : {
                switch (model) {
                    case 'User': throw new NotFoundException(AppErrors.User.NOT_FOUND(type, value))
                }
            }
            case 'P2002' : {
                switch (model) {
                    case 'User': throw new ConflictException(AppErrors.User.ALREADY_EXIST(type))
                }
            }
            default: throw new BadRequestException(error)
        }
    } 

    throw error
}