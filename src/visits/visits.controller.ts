import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
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

  @ApiOperation({ summary: 'Get visit by schedule and student' })
  @ApiResponse({ status: 200, type: Visit })
  @Get('/visit/:studentId/:scheduleId')
  @UseGuards(JwtAuthGuard)
  getVisitByScheduleAndStudent(@Param('studentId') studentId: string, @Param('scheduleId') scheduleId: string) {
    return this.visitsService.getVisitByScheduleAndStudent({ scheduleId, studentId });
  }
}
