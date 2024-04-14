import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher-dto';

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
}
