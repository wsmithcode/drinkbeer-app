import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { handlePrismaError } from 'src/utils/prisma-error.handler';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRole } from '@prisma/client';
import { GroupResponseDto } from './dto/group-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllGroups() {
    try {
      const groups = await this.prisma.group.findMany({
        include: {
          groupMember: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  avatar: true,
                },
              },
            },
            orderBy: [{ role: 'asc' }, { joinedAt: 'desc' }],
          },
          groupInvitation: true,
        },
      });

      const formattedGroups = groups.map(group => ({
        ...group,
        groupMember: group.groupMember.map(member => ({
          id: member.user.id,
          username: member.user.username,
          avatar: member.user.avatar,
          role: member.role,
          joinedAt: member.joinedAt,
          userId: member.userId,
          groupId: member.groupId,
        })),
      }));

      return formattedGroups;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async getGroupById(groupId: string) {
    try {
      const group = await this.prisma.group.findFirstOrThrow({
        where: { id: groupId },
        include: {
          groupMember: true,
          groupInvitation: true,
        },
      });

      return group;
    } catch (error) {
      throw handlePrismaError(error, {
        type: 'id',
        value: groupId,
        model: error.meta.modelName,
      });
    }
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
    ownerId: string
  ): Promise<GroupResponseDto> {
    try {
      const createGroupData = await this.prisma.group.create({
        data: {
          ...createGroupDto,
          ownerId,
          groupMember: {
            create: {
              userId: ownerId,
              role: GroupRole.OWNER,
            },
          },
        },
      });

      return plainToInstance(GroupResponseDto, createGroupData, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
