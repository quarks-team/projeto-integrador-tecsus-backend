import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tempo' })
export class Time {
  @PrimaryGeneratedColumn({ name: 'temp_id', type: 'bigint' })
  id: number;

  @Column({ name: 'temp_mes' })
  month: string;

  @Column({ name: 'temp_ano' })
  year: string;
}
