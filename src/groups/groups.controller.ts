import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Group } from './group.model';
import { CreateGroupDto } from './dto/create-group-dto';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: 200, type: Group })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() groupDto: CreateGroupDto) {
    return this.groupsService.createGroup(groupDto);
  }

  @ApiOperation({ summary: 'Get group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getGroupById(@Param('id') id: string) {
    return this.groupsService.getGroupById(id);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: Group })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllGroups() {
    return this.groupsService.getAllGroups();
  }
}
