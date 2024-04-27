import { forwardRef, Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { LocationsController } from './locations.controller';
import { Schedule } from '../schedule/schedule.model';
import { Location } from './location.model';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController],
  imports: [
    SequelizeModule.forFeature([Location, Schedule]),
    forwardRef(() => AuthModule),
  ],
  exports: [LocationsService],
})
export class LocationsModule {}
