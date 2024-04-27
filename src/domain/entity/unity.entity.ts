import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unidade_cliente' })
export class Unity {
  @PrimaryGeneratedColumn({ name: 'unid_cli_id', type: 'bigint' })
  id: number;

  @Column({ name: 'planta' })
  plant: string;

  @Column({ name: 'cnpj' })
  cnpj: string;
}
