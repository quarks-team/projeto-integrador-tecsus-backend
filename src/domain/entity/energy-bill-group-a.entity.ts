import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_energia_grupo_a' })
export class EnergyBillGroupA {
  @PrimaryGeneratedColumn({ name: 'conta_energia_a_id', type: 'int' })
  id: number;

  @Column({ name: 'energia_conta_mes' })
  month: Date;

  @Column({ name: 'total_conta_energia' })
  total: number;

  @Column({ name: 'numero_instalacao' })
  instalationNumber: string;

  @Column({ name: 'fornecedor' })
  provider: string;

  @Column({ name: 'planta_energia' })
  plant: string;

  @Column({ name: 'demanda_pt' })
  ptDemand: number;

  @Column({ name: 'demanda_fp_cap' })
  fpCapDemand: number;

  @Column({ name: 'demanda_fp_ind' })
  fpIndDemand: number;

  @Column({ name: 'consumo_pt_vd' })
  ptVdConsume: number;

  @Column({ name: 'consumo_fp_cap_vd' })
  fpCapVdConsume: number;

  @Column({ name: 'consumo_fp_ind_vd' })
  fpIndVdConsume: number;

  @Column({ name: 'consumo_a_pt_tusd' })
  aPtTusdConsume: number;

  @Column({ name: 'consumo_a_pt_te' })
  aPtTeConsume: number;

  @Column({ name: 'consumo_a_fp_tusd' })
  aFpTusdConsume: number;

  @Column({ name: 'consumo_a_fp_te' })
  aFpTeConsume: number;

}
