import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher-dto';
import { Discipline } from 'src/disciplines/discipline.model';
import { Group } from 'src/groups/group.model';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teachersService: TeacherService) {}

  @ApiOperation({ summary: 'Create teacher' })
  @ApiResponse({ status: 200, type: Teacher })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() teacherDto: CreateTeacherDto) {
    return this.teachersService.createTeacher(teacherDto);
  }

  @ApiOperation({ summary: 'Get teacher by id' })
  @ApiResponse({ status: 200, type: Teacher })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getTeacherById(@Param('id') id: string) {
    return this.teachersService.getTeacherById(id);
  }

  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({ status: 200, type: Teacher })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllTeachers() {
    return this.teachersService.getAllTeachers();
  }

  @ApiOperation({ summary: 'Delete teacher' })
  @ApiResponse({ status: 200, type: Teacher })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.teachersService.deleteTeacher(id);
  }

  @ApiOperation({ summary: 'Update teacher' })
  @ApiResponse({ status: 200, type: Teacher })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() teacherDto: CreateTeacherDto) {
    return this.teachersService.updateTeacher({ ...teacherDto, id });
  }

  @ApiOperation({ summary: 'Get teacher disciplines' })
  @ApiResponse({ status: 200, type: Discipline })
  @Get('/teacher/:teacherId')
  @UseGuards(JwtAuthGuard)
  getDisciplineByTeacherId(@Param('teacherId') teacherId: string) {
    return this.teachersService.getTeacherDisciplines(teacherId);
  }

  @ApiOperation({ summary: 'Get teacher groups' })
  @ApiResponse({ status: 200, type: Group })
  @Get('/groups/:teacherId/:disciplineId')
  @UseGuards(JwtAuthGuard)
  getTeacherGroups(
    @Param('teacherId') teacherId: string,
    @Param('disciplineId') disciplineId: string,
  ) {
    return this.teachersService.getTeacherGroups(teacherId, disciplineId);
  }
}
