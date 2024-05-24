import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'fato_conta_energia' })
@Unique('unique_fato_conta_energia', [
  `clientUnityId`,
  `energyContractId`,
  `timeId`,
  `aEnergyBillId`,
  `bEnergyBillId`,
  `placePlantId`,
])
export class EnergyFact {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: never;

  @Column({ name: 'unidade_cliente_id' })
  clientUnityId: number;

  @Column({ name: 'conta_energia_a_id', nullable: true })
  aEnergyBillId: number;

  @Column({ name: 'conta_energia_b_id', nullable: true })
  bEnergyBillId: number;

  @Column({ name: 'tempo_id', nullable: true })
  timeId: number;

  @Column({ name: 'contrato_energia_id' })
  energyContractId: number;

  @Column({ name: 'local_planta_id' })
  placePlantId: number;

  @Column({ name: 'total_conta_energia' })
  totalEnergyBill: number;

  @Column({ name: 'consumo_total_b', nullable: true })
  totalConsumeB: number;

  @Column({ name: 'consumo_total_a', nullable: true })
  totalConsumeA: number;

  @Column({ name: 'demanda_pt', nullable: true })
  pointDemandValue: number;

  @Column({ name: 'demanda_fp_cap', nullable: true })
  outOfPointdemandValueCap: number;

  @Column({ name: 'demanda_fp_ind', nullable: true })
  outOfPointdemandValueInd: number;

  @Column({ name: 'demanda_ponta', nullable: true })
  pointDemand: number;

  @Column({ name: 'demanda_fora_ponta', nullable: true })
  outOfPointDemand: number;
}
