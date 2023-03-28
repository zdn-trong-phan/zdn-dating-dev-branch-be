import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserWithinDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  range: number;
}
