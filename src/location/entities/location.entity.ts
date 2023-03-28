import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, OneToOne, Point } from 'typeorm';
import { Base } from '../../shared/base.entity';
import { User } from './../../user/entities/user.entity';

@Entity({ name: 'location', synchronize: true })
export class Location extends Base {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => User, (user) => user.location, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column('double precision')
  @ApiProperty()
  long: number;

  @Column('double precision')
  @ApiProperty()
  lat: number;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;
}
