import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_agua' })
export class WatterBill {
  @PrimaryGeneratedColumn({ name: 'agua_id', type: 'int' })
  id: number;

  @Column({ name: 'cod_rgi' })
  rgiCode: string;

  @Column({ name: 'agua_cont_mes' })
  billDate: Date;

  @Column({ name: 'hidrometro' })
  hidrometer: string;

  @Column({ name: 'consu_agua' })
  watterConsume: number;

  @Column({ name: 'consu_esgoto' })
  wastePipeConsume: number;

  @Column({ name: 'valor_agua' })
  watterValue: number;

  @Column({ name: 'valor_esgo' })
  wastePipeValue: number;

  @Column({ name: 'total_conta' })
  total: number;

  @Column({ name: 'planta' })
  plant: string;
}
