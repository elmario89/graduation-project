import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StudentVisitsService } from './student-visit.service';
import { CreateStudentVisitDto } from './dto/create-student-visit-dto';
import { StudentVisit } from './student-visit.model';

@ApiTags('StudentVisits')
@Controller('visits')
export class StudentVisitsController {
  constructor(private readonly visitsService: StudentVisitsService) {}

  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({ status: 200, type: StudentVisit })
  @Post('')
  @UseGuards(JwtAuthGuard)
  createStudentVisit(@Body() visitDto: CreateStudentVisitDto) {
    return this.visitsService.createStudentVisit(visitDto);
  }

  @ApiOperation({ summary: 'Create visit by teacher' })
  @ApiResponse({ status: 200, type: StudentVisit })
  @Post('/teacher')
  @UseGuards(JwtAuthGuard)
  createStudentVisitByTeacher(@Body() visitDto: Omit<CreateStudentVisitDto, 'coordinates'>) {
    return this.visitsService.createStudentVisit(visitDto, true);
  }

  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({ status: 200, type: StudentVisit })
  @Delete('/teacher/:id/:scheduleId/:studentId')
  @UseGuards(JwtAuthGuard)
  deleteStudentVisit(
    @Param('id') id: string,
    @Param('scheduleId') scheduleId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.visitsService.deleteStudentVisit({ id, scheduleId, studentId });
  }

  @ApiOperation({ summary: 'Get visit by schedule and student' })
  @ApiResponse({ status: 200, type: StudentVisit })
  @Get('/student/:studentId/:scheduleId')
  @UseGuards(JwtAuthGuard)
  getStudentVisitByScheduleAndStudent(
    @Param('studentId') studentId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    return this.visitsService.getStudentVisitByScheduleAndStudent({
      scheduleId,
      studentId,
    });
  }

  @ApiOperation({ summary: 'Get visit by schedule and student' })
  @ApiResponse({ status: 200, type: StudentVisit })
  @Get('/schedule/:scheduleId')
  @UseGuards(JwtAuthGuard)
  getStudentVisitBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.visitsService.getStudentVisitBySchedule(scheduleId);
  }
}
