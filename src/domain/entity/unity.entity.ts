import { ObjectId } from 'mongodb';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Unity {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  code: string;
}
