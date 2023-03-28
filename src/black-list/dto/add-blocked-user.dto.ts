import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class AddBlockedUserDto {
  @AutoMap()
  userId: string;

  @AutoMap()
  @IsNotEmpty()
  blockedId: string;
}
