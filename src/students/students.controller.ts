import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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

  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({ status: 200, type: Student })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() studentDto: CreateStudentDto) {
    return this.studentsService.updateStudent({ ...studentDto, id });
  }

  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({ status: 200, type: Student })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.studentsService.deleteStudent(id);
  }

  @ApiOperation({ summary: 'Get students by id' })
  @ApiResponse({ status: 200, type: [Student] })
  @Get('/by-group')
  @UseGuards(JwtAuthGuard)
  getStudentsById(@Query() studentDto: GetStudentByGroupDto) {
    return this.studentsService.getStudentsByGroup(studentDto.groupId);
  }

  @ApiOperation({ summary: 'Get student by id' })
  @ApiResponse({ status: 200, type: Student })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, type: Student })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }
}
