import { User } from './../../user/entities/user.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { MinLength, IsString } from 'class-validator';
import { Base } from '../../shared/base.entity';
import { Education, Gender, Reason, Religion } from '../../shared/enums/index';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'profile', synchronize: true })
export class Profile extends Base {
  @AutoMap()
  @Column({ name: 'user_id' })
  userId: string;

  @AutoMap()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @AutoMap()
  @Column({ name: 'name' })
  @IsString()
  @MinLength(3)
  name: string;

  @AutoMap()
  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @AutoMap()
  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @AutoMap()
  @Column({ name: 'reason', nullable: true })
  reason: Reason;

  @AutoMap()
  @Column({ name: 'birthday', type: 'date' })
  birthday: string;

  @AutoMap()
  @Column({ name: 'description', nullable: true })
  @IsString()
  description: string;

  @AutoMap()
  @Column({ name: 'height', nullable: true })
  height: number;

  @AutoMap()
  @Column({ name: 'religion', type: 'enum', enum: Religion, nullable: true })
  religion: Religion;

  @AutoMap()
  @Column({ name: 'drinking', nullable: true })
  drinking: boolean;

  @AutoMap()
  @Column({ name: 'education', type: 'enum', enum: Education, nullable: true })
  education: Education;

  @AutoMap()
  @Column({ name: 'have_children', nullable: true })
  haveChildren: boolean;

  @AutoMap()
  @Column('text', { name: 'interests', array: true, nullable: true })
  interests: string[];
}
