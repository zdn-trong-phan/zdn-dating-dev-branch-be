import { AutoMap } from '@automapper/classes';
import { IsArray, IsString } from 'class-validator';
import { Education, Gender, Reason, Religion } from 'src/shared/enums';
import { User } from 'src/user/entities/user.entity';
import { JoinColumn, OneToOne } from 'typeorm';

export class ProfileDto {
  @AutoMap()
  userId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @AutoMap()
  name: string;

  @AutoMap()
  gender: Gender;

  @AutoMap()
  avatar: string;

  @AutoMap()
  reason: Reason;

  @AutoMap()
  birthday: string;

  @AutoMap()
  description: string;

  @AutoMap()
  height: number;

  @AutoMap()
  religion: Religion;

  @AutoMap()
  drinking: boolean;

  @AutoMap()
  education: Education;

  @AutoMap()
  haveChildren: boolean;

  @AutoMap()
  interests: string[];
}
