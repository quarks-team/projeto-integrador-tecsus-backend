import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'fato_conta_agua' })
export class WatterFact {
  @PrimaryColumn({ name: 'contrato_agua_id' })
  contractId: number;

  @PrimaryColumn({ name: 'conta_agua_id' })
  watterBillId: number;

  @PrimaryColumn({ name: 'unidade_cliente_id' })
  clientUnityId: number;

  @PrimaryColumn({ name: 'tempo_id' })
  timeId: number;

  @PrimaryColumn({ name: 'local_planta_id' })
  placePlantId: number;

  @Column({ name: 'total_conta_agua' })
  totalWatterBill: number;

  @Column({ name: 'total_consumo_agua' })
  totalPlantId: number;

  @Column({ name: 'total_consumo_esgoto' })
  totalWatterConsume: number;

  @Column({ name: 'total_valor_agua' })
  totalWatterValue: number;

  @Column({ name: 'total_valor_esgoto' })
  totalWastePipeValue: number;
}
