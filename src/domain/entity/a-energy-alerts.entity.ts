import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alertas_consumo_energia_a' })
export class AEnergyConsumeAlert {
  @PrimaryGeneratedColumn({ name: 'alerta_consumo_energia_a_id', type: 'int' })
  id: number;

  @Column({ name: 'contrato_energia_id' })
  energyContractId: number;

  @Column({ name: 'unidade_cliente_id' })
  clientUnityId: number;

  @Column({ name: 'local_planta_id' })
  plantId: number;

  @Column({ name: 'data_alerta' })
  alertDate: Date;

  @Column({ name: 'consumo_atual' })
  watterConsume: number;

  @Column({ name: 'media_trimestral' })
  quarterlyAverage: number;

  @Column({ name: 'excesso_percentual' })
  percentageExcess: number;
}
