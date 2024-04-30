import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contrato_energia' })
export class EnergyContract {
  @PrimaryGeneratedColumn({ name: 'contr_energ_id', type: 'bigint' })
  id: number;

  @Column({ name: 'nome_contr_energ' })
  name: string;

  @Column({ name: 'forne_nome' })
  provider: string;

  @Column({ name: 'num_medidor' })
  medidorNumber: string;

  @Column({ name: 'tensao' })
  tension: string;

  @Column({ name: 'unid_metric' })
  metricUnity: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'planta' })
  plant: string;
}
