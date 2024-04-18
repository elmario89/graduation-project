import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Schedule } from './schedule.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { SchedulesService } from './schedules.service';
import { Group } from '../groups/group.model';
import { CreateVisitDto } from './dto/create-visit-dto';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOperation({ summary: 'Add schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  addSchedule(@Body() groupDto: CreateScheduleDto) {
    return this.schedulesService.addSchedule(groupDto);
  }

  @ApiOperation({ summary: 'Get all schedules' })
  @ApiResponse({ status: 200, type: Group })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllSchedules() {
    return this.schedulesService.getAllSchedules();
  }

  @ApiOperation({ summary: 'Get schedules by group id' })
  @ApiResponse({ status: 200, type: Group })
  @Get('/group/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getScheduleByGroupId(@Param('id') id: string) {
    return this.schedulesService.getScheduleByGroupId(id);
  }

  @ApiOperation({ summary: 'Get schedules by teacher id' })
  @ApiResponse({ status: 200, type: Group })
  @Get('/teacher/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getScheduleByTeacherId(@Param('id') id: string) {
    return this.schedulesService.getScheduleByTeacherId(id);
  }
}