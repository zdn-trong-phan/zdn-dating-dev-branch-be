import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FindMatchDto {
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  matchedId: string;
}
