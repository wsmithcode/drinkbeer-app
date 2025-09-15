import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppErrors } from 'src/constant/errors/error.message';

export function handlePrismaError(
  error: unknown,
  context?: { type?: string; value?: string; model?: string }
): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const model = context?.model || error.meta?.modelName || 'unknown';
    const type = context?.type || 'unknown';
    const value = context?.value || 'unknown';

    switch (error.code) {
      case 'P2025': {
        switch (model) {
          case 'User':
            throw new NotFoundException(AppErrors.User.NOT_FOUND(type, value));
          case 'Group':
            throw new NotFoundException(AppErrors.Group.NOTFOUND(type, value));
        }
      }
      case 'P2002': {
        switch (model) {
          case 'User':
            throw new ConflictException(AppErrors.User.ALREADY_EXIST(type));
        }
      }
      case 'P2023': {
        throw new BadRequestException(AppErrors.ID.UUID_WRONG_FORMAT);
      }
      case 'P2022': {
        throw new BadRequestException(AppErrors.DATABASE.SCHEMA_ERROR);
      }
      case 'P2003': {
        switch(model) {
          case 'Group': {
            const fieldName = error.meta?.constraint === 'Group_ownerId_fkey' ? 'Owner Id' : 'unknown field';
            throw new BadRequestException(`Foreign key constraint failed on ${fieldName}`);
          }
        }
        throw new BadRequestException('Foreign key constraint failed');
      }
      default:
        throw new BadRequestException(error);
    }
  }

  throw error;
}
