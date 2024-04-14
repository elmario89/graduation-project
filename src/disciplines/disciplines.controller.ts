import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discipline } from './discipline.model';
import { CreateDisciplineDto } from './dto/create-discipline-dto';
import { DisciplinesService } from './disciplines.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Disciplines')
@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @ApiOperation({ summary: 'Create discipline' })
  @ApiResponse({ status: 200, type: Discipline })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() disciplineDto: CreateDisciplineDto) {
    return this.disciplinesService.createDiscipline(disciplineDto);
  }

  @ApiOperation({ summary: 'Get all disciplines' })
  @ApiResponse({ status: 200, type: Discipline })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllTeachers() {
    return this.disciplinesService.getAllDisciplines();
  }
}
