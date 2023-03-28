import { AutoMap } from '@automapper/classes';
import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Education, Religion } from 'src/shared/enums';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @AutoMap()
  @ApiPropertyOptional({
    default: 'Anh đẹp trai nhưng chưa có ngừi eo',
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description?: string;

  @AutoMap()
  @ApiPropertyOptional({
    default:
      'http://res.cloudinary.com/dtra2soty/image/upload/v1679476089/ycmo2vjymmt9oo5gmao5.png',
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  avatar?: string;

  @AutoMap()
  @ApiPropertyOptional({
    default: 180,
    type: Number,
  })
  @IsOptional()
  @IsNotEmpty()
  height?: number;

  @AutoMap()
  @ApiPropertyOptional({
    default: Religion.CHRISTIAN,
    type: String,
  })
  @IsOptional()
  @IsEnum(Religion)
  religion?: Religion;

  @AutoMap()
  @ApiPropertyOptional({
    default: true,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  drinking?: boolean;

  @AutoMap()
  @ApiPropertyOptional({
    default: Education.HIGH_SCHOOL,
    type: String,
  })
  @IsOptional()
  @IsEnum(Education)
  education?: Education;

  @AutoMap()
  @ApiPropertyOptional({
    default: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  haveChildren?: boolean;

  @AutoMap()
  @ApiPropertyOptional({
    default: [],
    type: Array,
  })
  @IsOptional()
  interests?: string[];
}
