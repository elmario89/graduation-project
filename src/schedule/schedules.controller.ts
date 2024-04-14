import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Schedule } from './schedule.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { SchedulesService } from './schedules.service';

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
}
