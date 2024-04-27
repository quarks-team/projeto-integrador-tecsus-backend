import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_energia' })
export class EnergyBill {
  @PrimaryGeneratedColumn({ name: 'energ_id', type: 'bigint' })
  id: number;

  @Column({ name: 'energ_cont_mes' })
  month: Date;

  @Column({ name: 'num_install' })
  instalationNumber: string;

  @Column({ name: 'total_conta_energ' })
  total: number;

  @Column({ name: 'num_medidor' })
  medidorNumber: string;

  @Column({ name: 'consumo_total' })
  totalConsume: number;

  @Column({ name: 'planta' })
  plant: string;
}
