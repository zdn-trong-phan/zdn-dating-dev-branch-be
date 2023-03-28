import { AutoMap } from '@automapper/classes';

export class BlackListDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  blockedId: string;
}
