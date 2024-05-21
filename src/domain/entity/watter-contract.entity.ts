import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'contrato_agua' })
export class WatterContract {
  @PrimaryGeneratedColumn({ name: 'contrato_agua_id', type: 'int' })
  id: number;

  @Column({ name: 'nome_contrato_agua' })
  name: string;

  @Column({ name: 'codigo_rgi' })
  code: string;

  @Column({ name: 'hidrometro' })
  hidrometer: string;

  @Column({ name: 'fornecedor_agua' })
  provider: string;

  @Column({ name: 'cnpj' })
  cnpj: string;
}
