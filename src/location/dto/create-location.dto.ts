import { IsNotEmpty, IsNumber } from 'class-validator';
import { Point } from 'typeorm';

export class CreateLocationDto {
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  long: number;

  @IsNumber()
  @IsNotEmpty()
  lat: number;
}
