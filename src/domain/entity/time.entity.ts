import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tempo' })
export class Time {
  @PrimaryGeneratedColumn({ name: 'tempo_id', type: 'int' })
  id: number;

  @Column({ name: 'tempo_mes' })
  month: string;

  @Column({ name: 'tempo_ano' })
  year: string;
}
