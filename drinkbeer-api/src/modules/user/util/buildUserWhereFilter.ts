import { Prisma } from "@prisma/client";
import { UserFilterDto } from "../dto/user-filter.dto";

export function BuildUserWhereFilter(userFilter: UserFilterDto ): Prisma.UserWhereInput {
    const filter: Prisma.UserWhereInput = {};

    if (userFilter.username) {
        filter.username = {
            contains: userFilter.username,
            mode: 'insensitive'
        }
    }

    return filter
}