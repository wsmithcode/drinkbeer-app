import { NotFoundException } from "@nestjs/common";
import { Prisma, PrismaClient } from '@prisma/client'
import { AppErrors } from "src/constant/errors/error.message";

export function handlePrismaError(error: unknown, context?: {id: string; model?: string}) {
    if ( error instanceof Prisma.PrismaClientKnownRequestError ) {

        const model = context?.model || 'unknown'
        const id = context?.id || 'unknown'

        switch (error.code ) {
            case 'P2025' : {
                switch (model) {
                    case 'User': throw new NotFoundException(AppErrors.User.NOT_FOUND(id))
                }
            }
        }
    } 
}