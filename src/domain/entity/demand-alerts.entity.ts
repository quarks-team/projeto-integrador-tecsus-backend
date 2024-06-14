import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alertas_demanda_energia' })
export class EnergyDemandAlert {
  @PrimaryGeneratedColumn({ name: 'alerta_id', type: 'int' })
  id: number;

  @Column({ name: 'contrato_energia_id' })
  energyContractId: number;

  @Column({ name: 'unidade_cliente_id' })
  clientUnityId: number;

  @Column({ name: 'local_planta_id' })
  plantId: number;

  @Column({ name: 'data_alerta' })
  alertDate: Date;

  @Column({ name: 'demanda_pt' })
  ptDemandBill: number;

  @Column({ name: 'demanda_ponta' })
  pointDemandContract: number;

  @Column({ name: 'demanda_fp_cap' })
  fpCapDemandBill: number;

  @Column({ name: 'demanda_fp_ind' })
  fpIndDemandBill: number;

  @Column({ name: 'demanda_fora_ponta' })
  outsidePointDemandContract: number;

  @Column({ name: 'excesso_percentual_pt' })
  pointPercentageExcess: number;

  @Column({ name: 'excesso_percentual_fp' })
  outsidePointPercentageExcess: number;
}
