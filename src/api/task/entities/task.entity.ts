import { User } from '@/api/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  todo: string;

  @ManyToOne(
    () => {
      return User;
    },
    (user) => {
      return user.id;
    },
  )
  user: User;
}
