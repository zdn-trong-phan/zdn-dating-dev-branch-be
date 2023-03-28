import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Gender } from '../../shared/enums/index';

export class SignUpDto {
  @ApiProperty({
    default: '0934128854',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)
  phone: string;

  @ApiProperty({
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

  @ApiProperty({
    default: 'Jonas Schmedmann',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    default: '2001-11-16',
    type: String,
  })
  @IsDateString()
  birthday: string;

  @ApiProperty({
    default: Gender.MALE,
    type: String,
  })
  @IsEnum(Gender)
  gender: Gender;
}
