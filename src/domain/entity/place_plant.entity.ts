import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'local_planta' })
export class PlacePlant {
  @PrimaryGeneratedColumn({ name: 'local_planta_id', type: 'int' })
  id: number;

  @Column({ name: 'planta' })
  plant: string;
}
