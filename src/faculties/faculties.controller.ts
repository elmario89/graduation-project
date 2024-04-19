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
import { Faculty } from './faculty.model';
import { CreateFacultyDto } from './dto/create-faculty-dto';
import { FacultiesService } from './faculties.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Group } from '../groups/group.model';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @ApiOperation({ summary: 'Create faculties' })
  @ApiResponse({ status: 200, type: Faculty })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() facultiesDto: CreateFacultyDto) {
    return this.facultiesService.createFaculty(facultiesDto);
  }

  @ApiOperation({ summary: 'Get all faculties' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllFaculties() {
    return this.facultiesService.getAllFaculties();
  }

  @ApiOperation({ summary: 'Delete faculty' })
  @ApiResponse({ status: 200, type: Group })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.facultiesService.deleteFaculty(id);
  }

  @ApiOperation({ summary: 'Update faculty' })
  @ApiResponse({ status: 200, type: Group })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() facultyDto: CreateFacultyDto) {
    return this.facultiesService.updateFaculty({ ...facultyDto, id });
  }

  @ApiOperation({ summary: 'Get faculty by id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getFacultyById(@Param('id') id: string) {
    return this.facultiesService.getFacultyById(id);
  }
}
