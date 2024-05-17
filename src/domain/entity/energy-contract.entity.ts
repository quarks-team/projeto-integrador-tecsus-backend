import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contrato_energia' })
export class EnergyContract {
  @PrimaryGeneratedColumn({ name: 'contrato_energia_id', type: 'int' })
  id: number;

  @Column({ name: 'nome_contrato_energia' })
  name: string;

  @Column({ name: 'fornecedor_energia' })
  provider: string;

  @Column({ name: 'numero_medidor' })
  medidorNumber: string;

  @Column({ name: 'numero_instalacao' })
  instalationNumber: string;

  @Column({ name: 'demanda_ponta' })
  pointDemand: number;

  @Column({ name: 'demanda_fora_ponta' })
  outsidePointDemand: number;
}
