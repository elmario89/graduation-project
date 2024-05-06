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
import { Location } from './location.model';
import { CreateLocationDto } from './dto/create-location-dto';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';
import { Group } from '../groups/group.model';
import { Faculty } from '../faculties/faculty.model';
import { GetLocationsDto } from './dto/get-locations-dto';
import { Day } from 'src/enums/day.enum';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: 'Create location' })
  @ApiResponse({ status: 200, type: Location })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  create(@Body() locationDto: CreateLocationDto) {
    return this.locationsService.createLocation(locationDto);
  }

  @ApiOperation({ summary: 'Update location' })
  @ApiResponse({ status: 200, type: Location })
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() locationDto: CreateLocationDto,
  ) {
    return this.locationsService.updateLocation({ ...locationDto, id });
  }

  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, type: Location })
  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getAllLocations() {
    return this.locationsService.getAllLocations();
  }

  @ApiOperation({ summary: 'Get locations by day' })
  @ApiResponse({ status: 200, type: Location })
  @Get('/:day/:time')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  getLocationsByTimeAndDay(@Param('day') day: Day, @Param('time') time: number) {
    return this.locationsService.getLocationByTimeAndDay({ day, time });
  }

  @ApiOperation({ summary: 'Delete location' })
  @ApiResponse({ status: 200, type: Group })
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  delete(@Param('id') id: string) {
    return this.locationsService.deleteLocation(id);
  }

  @ApiOperation({ summary: 'Get location by id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getFacultyById(@Param('id') id: string) {
    return this.locationsService.getLocationById(id);
  }
}
