import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: '0934128854',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
  phone: string;

  @ApiPropertyOptional({
    default: '89pIS7TpRxOq8JOuzwbd6ZhkxVz1',
    type: String,
  })
  @IsOptional()
  @IsString()
  socialId: string;

  @ApiProperty({
    default: 'emvatoy@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
