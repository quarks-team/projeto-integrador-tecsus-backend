import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alertas_consumo_agua' })
export class WatterAlert {
  @PrimaryGeneratedColumn({ name: 'alerta_consumo_agua_id', type: 'int' })
  id: number;

  @Column({ name: 'contrato_agua_id' })
  watterContractId: number;

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
