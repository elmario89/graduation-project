import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
  @ApiProperty({
    example: 'Дискретная математика',
    description: 'Faculty name',
  })
  readonly name: string;
}
