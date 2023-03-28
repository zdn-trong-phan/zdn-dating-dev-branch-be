import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { NotiType } from 'src/shared/enums';
import { User } from 'src/user/entities/user.entity';
import { OneToOne, JoinColumn } from 'typeorm';

export class CreateNotificationDto {
  @AutoMap()
  @ApiProperty({
    default: 'dd5ef115-3049-433e-9f43-c9b75b7afc13',
    type: String,
  })
  userFromId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userFrom: User;

  @AutoMap()
  @ApiProperty({
    default: 'dd5ef115-3049-433e-9f43-c9b75b7afc13',
    type: String,
  })
  userToId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userTo: User;

  @AutoMap()
  @ApiProperty({
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  isSeen: boolean;

  @AutoMap()
  @ApiProperty({
    default: NotiType.MATCHING,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  type: NotiType;
}
