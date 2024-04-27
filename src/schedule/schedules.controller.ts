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
import { Schedule } from './schedule.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { SchedulesService } from './schedules.service';
import { Group } from '../groups/group.model';

@ApiTags('Schedules')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOperation({ summary: 'Add schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  addSchedule(@Body() scheduleDto: CreateScheduleDto) {
    return this.schedulesService.addSchedule(scheduleDto);
  }

  @ApiOperation({ summary: 'Add schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  updateSchedules(
    @Param('id') id: string,
    @Body() scheduleDto: CreateScheduleDto,
  ) {
    return this.schedulesService.updateSchedule({ ...scheduleDto, id });
  }

  @ApiOperation({ summary: 'Delete schedule' })
  @ApiResponse({ status: 200, type: Schedule })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.schedulesService.deleteSchedule(id);
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

  @ApiOperation({ summary: 'Get schedules by group id' })
  @ApiResponse({ status: 200, type: Group })
  @Get('/schedule/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getScheduleById(@Param('id') id: string) {
    return this.schedulesService.getScheduleById(id);
  }
}
