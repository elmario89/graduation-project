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
import { Auditory } from './auditory.model';
import { CreateAuditoryDto } from './dto/create-auditory-dto';
import { AuditoriesService } from './auditory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Group } from '../groups/group.model';
import { Faculty } from '../faculties/faculty.model';
import { Day } from 'src/enums/day.enum';

@ApiTags('Auditories')
@Controller('auditories')
export class AuditoriesController {
  constructor(private readonly auditoryService: AuditoriesService) {}

  @ApiOperation({ summary: 'Create auditory' })
  @ApiResponse({ status: 200, type: Auditory })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() auditoryDto: CreateAuditoryDto) {
    return this.auditoryService.createAuditory(auditoryDto);
  }

  @ApiOperation({ summary: 'Update auditory' })
  @ApiResponse({ status: 200, type: Auditory })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() auditoryDto: CreateAuditoryDto) {
    return this.auditoryService.updateAuditory({ ...auditoryDto, id });
  }

  @ApiOperation({ summary: 'Get all auditory' })
  @ApiResponse({ status: 200, type: Auditory })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllAuditories() {
    return this.auditoryService.getAllAuditories();
  }

  @ApiOperation({ summary: 'Get auditory by day' })
  @ApiResponse({ status: 200, type: Auditory })
  @Get('/:day/:time')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAuditoriesByTimeAndDay(
    @Param('day') day: Day,
    @Param('time') time: string,
  ) {
    return this.auditoryService.getAuditoryByTimeAndDay({ day, time });
  }

  @ApiOperation({ summary: 'Delete auditory' })
  @ApiResponse({ status: 200, type: Group })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.auditoryService.deleteAuditory(id);
  }

  @ApiOperation({ summary: 'Get auditory by id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getFacultyById(@Param('id') id: string) {
    return this.auditoryService.getAuditoryById(id);
  }
}
