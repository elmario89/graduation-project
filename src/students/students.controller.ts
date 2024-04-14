import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Student } from './student.model';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student-dto';
import { GetStudentByGroupDto } from './dto/get-student-by-group-dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 200, type: Student })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() studentDto: CreateStudentDto) {
    return this.studentsService.createStudent(studentDto);
  }

  @ApiOperation({ summary: 'Get students by id' })
  @ApiResponse({ status: 200, type: [Student] })
  @Get()
  @UseGuards(JwtAuthGuard)
  getStudentsById(@Query() studentDto: GetStudentByGroupDto) {
    return this.studentsService.getStudentsByGroup(studentDto.groupId);
  }
}
