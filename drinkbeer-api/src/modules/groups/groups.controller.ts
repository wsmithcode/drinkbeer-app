import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async getAllGroups() {
    return await this.groupsService.getAllGroups();
  }

  @Get(':id')
  async getGroupById(@Param('id') id: string) {
    return await this.groupsService.getGroupById(id);
  }

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupsService.createGroup(createGroupDto, '');
  }
}
