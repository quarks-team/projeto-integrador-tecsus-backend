import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { EnergyContractPayload } from '../request/energy-contract-payload';
import { EnergyContract } from '../entity/energy-contract.entity';

@Injectable()
export class IngestEnergyContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(EnergyContract) private readonly contractRepo: Repository<EnergyContract>,
  ) {}

  async execute(energyContracts: EnergyContractPayload[]) {
    const unitys: Partial<Unity>[] = [];
    const contracts: Partial<EnergyContract>[] = [];

    energyContracts.forEach((contract) => {
      const mergedCNPJ = this.mergeCNPJs(contract);
      contracts.push({
        name: contract['Nome do Contrato'],
        provider: contract.Fornecedor,
        medidorNumber: contract['Número Medidor'],
        tension: contract['Tensão Contraatada (V)'],
        metricUnity: contract['Unidade Métrica'],
        cnpj: mergedCNPJ,
        plant: contract.Planta,
      });

      unitys.push({
        plant: contract.Planta,
        cnpj: mergedCNPJ,
      });
    });

    const unitysCreated = await this.unityRepo.save(unitys);
    console.log(unitysCreated);

    const savedContracts = await this.contractRepo.save(contracts);
    return savedContracts;
  }

  mergeCNPJs(contract: EnergyContractPayload): string {
    const campoExtra3: string = contract['Campo Extra 3'] || '';
    const campoExtra4: string = contract['Campo Extra 4'] || '';
    const mergedList: string = (campoExtra3 + campoExtra4).replace(/[\s\-.;,]/g, '');
    const uniqueCNPJs: string = [...new Set(mergedList.split(''))].join('');
    return uniqueCNPJs;
  }
}
