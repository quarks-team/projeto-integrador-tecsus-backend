import { ObjectId } from 'mongodb';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  unityId: number;

  @Column()
  concessionaireId: number;

  @Column()
  contractName: string;
}
