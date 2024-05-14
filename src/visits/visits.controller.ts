import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VisitsService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit-dto';
import { Visit } from './visit.model';

@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({ status: 200, type: Visit })
  @Post('')
  @UseGuards(JwtAuthGuard)
  createVisit(@Body() visitDto: CreateVisitDto) {
    return this.visitsService.createVisit(visitDto);
  }

  @ApiOperation({ summary: 'Create visit by teacher' })
  @ApiResponse({ status: 200, type: Visit })
  @Post('/teacher')
  @UseGuards(JwtAuthGuard)
  createVisitByTeacher(@Body() visitDto: Omit<CreateVisitDto, 'coordinates'>) {
    return this.visitsService.createVisit(visitDto, true);
  }

  @ApiOperation({ summary: 'Create visit' })
  @ApiResponse({ status: 200, type: Visit })
  @Delete('/teacher/:id/:scheduleId/:studentId')
  @UseGuards(JwtAuthGuard)
  deleteVisit(@Param('id') id: string, @Param('scheduleId') scheduleId: string, @Param('studentId') studentId: string) {
    return this.visitsService.deleteVisit({ id, scheduleId, studentId });
  }

  @ApiOperation({ summary: 'Get visit by schedule and student' })
  @ApiResponse({ status: 200, type: Visit })
  @Get('/student/:studentId/:scheduleId')
  @UseGuards(JwtAuthGuard)
  getVisitByScheduleAndStudent(@Param('studentId') studentId: string, @Param('scheduleId') scheduleId: string) {
    return this.visitsService.getVisitByScheduleAndStudent({ scheduleId, studentId });
  }

  @ApiOperation({ summary: 'Get visit by schedule and student' })
  @ApiResponse({ status: 200, type: Visit })
  @Get('/schedule/:scheduleId')
  @UseGuards(JwtAuthGuard)
  getVisitBySchedule(@Param('scheduleId') scheduleId: string) {
    return this.visitsService.getVisitBySchedule(scheduleId);
  }
}
