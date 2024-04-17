import { ObjectId } from 'mongodb';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Concessionaire {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  type: string;
}
