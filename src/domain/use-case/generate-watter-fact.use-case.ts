import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatterContract } from '../entity/watter-contract.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { WatterFact } from '../entity/watter-fact.entity';

@Injectable()
export class GenerateWatterFact {
  constructor(
    @InjectRepository(WatterBill)
    private readonly billRepo: Repository<WatterBill>,
    @InjectRepository(WatterContract)
    private readonly contractRepo: Repository<WatterContract>,
    @InjectRepository(WatterFact)
    private readonly factRepo: Repository<WatterFact>,
  ) {}

  async execute() {
    const hasSomeContract = await this.contractRepo.count();
    const hasSomeBill = await this.billRepo.count();
    console.log(hasSomeBill, hasSomeContract);
    if (hasSomeBill > 0 && hasSomeContract > 0) {
      await this.factRepo.clear();
      await this.factRepo.query(`INSERT INTO fato_conta_agua (
        contrato_agua_id,
        conta_agua_id,
        unidade_cliente_id,
        tempo_id,
        local_planta_id,
        total_conta_agua,
        total_consumo_agua,
        total_consumo_esgoto,
        total_valor_agua,
        total_valor_esgoto
    )
    SELECT 
        c.contrato_agua_id, 
        conta.conta_agua_id, 
        u.unidade_cliente_id, 
        t.tempo_id, 
        l.local_planta_id,
        SUM(conta.total_conta_agua) AS total_conta_agua, 
        SUM(conta.consumo_agua) AS total_consumo_agua,
        SUM(conta.consumo_esgoto) AS total_consumo_esgoto, 
        SUM(conta.valor_agua) AS total_valor_agua, 
        SUM(conta.valor_esgoto) AS total_valor_esgoto
    FROM 
        conta_agua conta
    INNER JOIN 
        contrato_agua c ON conta.codigo_rgi = c.codigo_rgi
    INNER JOIN 
        unidade_cliente u ON c.cnpj = u.cnpj
    INNER JOIN 
        local_planta l ON l.planta = conta.planta_agua
    INNER JOIN 
        tempo t ON t.tempo_mes = DATE_FORMAT(conta.agua_conta_mes, '%m') 
                  AND t.tempo_ano = DATE_FORMAT(conta.agua_conta_mes, '%Y')
    GROUP BY 
        c.contrato_agua_id, 
        conta.conta_agua_id, 
        u.unidade_cliente_id, 
        t.tempo_id, 
        l.local_planta_id;`);
    }
  }
}
