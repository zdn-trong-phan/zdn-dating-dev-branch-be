import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTest {
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  long: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  lat: number;
}
