import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
