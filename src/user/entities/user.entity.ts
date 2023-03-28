import { IsEmail, MaxLength, MinLength } from 'class-validator';

import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { BlackList } from '../../black-list/entities/black-list.entity';
import { Location } from '../../location/entities/location.entity';
import { Match } from '../../match/entities/match.entity';
import { Notification } from '../../notification/entities/notification.entity';
import { Photo } from '../../photo/entities/photo.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Base } from '../../shared/base.entity';

@Entity({ name: 'user', synchronize: true })
export class User extends Base {
  @Column({ name: 'phone', unique: true })
  @MinLength(15)
  @MaxLength(15)
  phone: string;

  @Column({ name: 'social_id', nullable: true })
  socialId: string;

  @Column({ name: 'email' })
  @IsEmail()
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Match, (match) => match.user)
  matches: Match[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @OneToMany(() => Notification, (notification) => notification.fromUser)
  notifications: Notification[];

  @OneToMany(() => BlackList, (blackList) => blackList.user)
  blackList: BlackList[];

  @OneToOne(() => Location, (location) => location.user)
  location: Location;
}
