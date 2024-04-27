import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contrato_agua' })
export class WatterContract {
  @PrimaryGeneratedColumn({ name: 'contr_agua_id', type: 'int' })
  id: number;

  @Column({ name: 'nome_contr_agua' })
  name: string;

  @Column({ name: 'cod_liga_rgi' })
  code: string;

  @Column({ name: 'num_install' })
  installNumber: string;

  @Column({ name: 'forne_nome' })
  provider: string;

  @Column({ name: 'cnpj' })
  cnpj: string;

  @Column({ name: 'planta' })
  plant: string;
}
