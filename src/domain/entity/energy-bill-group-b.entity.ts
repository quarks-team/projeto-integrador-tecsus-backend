import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_energia_grupo_b' })
export class EnergyBillGroupB {
  @PrimaryGeneratedColumn({ name: 'conta_energia_b_id', type: 'int' })
  id: number;

  @Column({ name: 'energia_conta_mes' })
  month: Date;

  @Column({ name: 'total_conta_energia' })
  total: number;

  @Column({ name: 'numero_instalacao' })
  instalationNumber: string;

  @Column({ name: 'fornecedor' })
  provider: string;

  @Column({ name: 'numero_medidor' })
  medidorNumber: string;

  @Column({ name: 'planta_energia' })
  plant: string;

  @Column({ name: 'consumo_total' })
  totalConsume: number;

  @Column({ name: 'uso_sist_distr' })
  sistDistrUse: number;

  @Column({ name: 'uso_sist_distr_custo' })
  sistDistrUseCost: number;
  
}
