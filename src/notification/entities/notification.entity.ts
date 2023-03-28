import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../shared/base.entity';
import { NotiType } from '../../shared/enums/index';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notification extends Base {
  @Column({ name: 'from_id' })
  userFromId: string;

  @Column({ name: 'to_id' })
  userToId: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'from_id' })
  fromUser: User;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'to_id' })
  toUser: User;

  @Column({ name: 'is_seen' })
  isSeen: boolean;

  @Column('text')
  type: NotiType;
}
