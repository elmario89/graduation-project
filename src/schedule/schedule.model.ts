import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Group } from '../groups/group.model';
import { Teacher } from '../teachers/teacher.model';
import { Discipline } from '../disciplines/discipline.model';
import { Day } from '../enums/day.enum';
import { ScheduleType } from '../enums/schedule-type.enum';
import { Location } from '../locations/location.model';

interface ScheduleCreationAttrs {
  date: Date;
  teacherId: string;
  disciplineId: string;
  groupId: string;
  day: Day;
}

@Table({ tableName: 'schedules' })
export class Schedule extends Model<Schedule, ScheduleCreationAttrs> {
  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Unique identificator',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({
    example: '9:40',
    description: 'Education time start',
  })
  @Column({ type: DataType.TIME, allowNull: false })
  timeStart: string;

  @ApiProperty({
    example: '9:40',
    description: 'Education time Finish',
  })
  @Column({ type: DataType.TIME, allowNull: false })
  timeFinish: string;

  @ApiProperty({ example: Day.Monday, description: 'Day of the week' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  day: string;

  @ApiProperty({ example: ScheduleType.Lecture, description: 'Type of class' })
  @Column({
    type: DataType.ENUM(...Object.values(ScheduleType)),
    allowNull: false,
  })
  scheduleType: ScheduleType;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Teacher id',
  })
  @ForeignKey(() => Teacher)
  @Column({ type: DataType.UUID, allowNull: false })
  teacherId: string;

  @BelongsTo(() => Discipline)
  discipline: Discipline;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Discipline id',
  })
  @ForeignKey(() => Discipline)
  @Column({ type: DataType.UUID, allowNull: false })
  disciplineId: string;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Schedule group id',
  })
  @ForeignKey(() => Group)
  @Column({ type: DataType.UUID, allowNull: false })
  groupId: string;

  @BelongsTo(() => Location)
  location: Location;

  @ApiProperty({
    example: 'b70f4034-5328-4c02-b652-d4a4414f3a29',
    description: 'Location id',
  })
  @ForeignKey(() => Location)
  @Column({ type: DataType.UUID, allowNull: false })
  locationId: string;
}
