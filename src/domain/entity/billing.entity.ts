import { ObjectId } from 'mongodb';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  timeId: number;

  @Column()
  watterId: number;

  @Column()
  energyId: number;

  @Column()
  gasId: number;

  @Column()
  value: string;
}
