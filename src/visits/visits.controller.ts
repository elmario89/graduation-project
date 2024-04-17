import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { VisitsService } from './visit.service';
import { Group } from '../groups/group.model';
import { CreateVisitDto } from './dto/create-visit-dto';

@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @ApiOperation({ summary: 'Get visits by teacher id' })
  @ApiResponse({ status: 200, type: Group })
  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  createVisit(@Body() visitDto: CreateVisitDto) {
    return this.visitsService.createVisit(visitDto);
  }
}
