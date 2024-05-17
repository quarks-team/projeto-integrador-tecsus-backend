import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unidade_cliente' })
export class Unity {
  @PrimaryGeneratedColumn({ name: 'unidade_cliente_id', type: 'int' })
  id: number;

  @Column({ name: 'cnpj' })
  cnpj: string;
}
