import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_agua' })
export class WatterBill {
  @PrimaryGeneratedColumn({ name: 'conta_agua_id', type: 'int' })
  id: number;

  @Column({ name: 'codigo_rgi' })
  rgiCode: string;

  @Column({ name: 'agua_conta_mes' })
  billDate: Date;

  @Column({ name: 'hidrometro' })
  hidrometer: string;

  @Column({ name: 'consumo_agua' })
  watterConsume: number;

  @Column({ name: 'consumo_esgoto' })
  wastePipeConsume: number;

  @Column({ name: 'valor_agua' })
  watterValue: number;

  @Column({ name: 'valor_esgoto' })
  wastePipeValue: number;

  @Column({ name: 'total_conta_agua' })
  total: number;

  @Column({ name: 'planta_agua' })
  plant: string;

  /* @Column({ name: 'fornecedor' })
  provider: string; 
  conta de agua não possui forncedor, apenas o contrato
  */
}
