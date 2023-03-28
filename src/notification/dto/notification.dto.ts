import { AutoMap } from '@automapper/classes';
import { NotiType } from 'src/shared/enums';
import { User } from 'src/user/entities/user.entity';
import { JoinColumn, OneToOne } from 'typeorm';

export class NotificationDto {
  @AutoMap()
  userFromId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userFrom: User;

  @AutoMap()
  userToId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userTo: User;

  @AutoMap()
  isSeen: boolean;

  @AutoMap()
  type: NotiType;
}
