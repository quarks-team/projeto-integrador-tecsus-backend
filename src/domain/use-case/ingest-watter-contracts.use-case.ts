import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { WatterContractPayload } from '../request/watter-contract-payload';
import { Repository } from 'typeorm';
import { WatterContract } from '../entity/watter-contract.entity';

@Injectable()
export class IngestWatterContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(WatterContract) private readonly contractRepo: Repository<WatterContract>,
  ) {}

  async execute(watterContracts: WatterContractPayload[]) {
    const unitys: Partial<Unity>[] = [];
    const contracts: Partial<WatterContract>[] = [];

    watterContracts.forEach((contract) => {
      const mergedCNPJ = this.mergeCNPJs(contract);
      contracts.push({
        name: contract['Nome do Contrato'],
        code: contract['Código de Ligação (RGI)'].replace(/[-\/]/g, ''),
        installNumber: contract['Número Instalação'],
        provider: contract.Fornecedor,
<<<<<<< Updated upstream
        cnpj: (contract['Campo Extra 3'] ?? contract['Campo Extra 4']).replace(/[-\/]/g, ''),
=======
        cnpj: mergedCNPJ,
>>>>>>> Stashed changes
        plant: contract.Planta,
      });

      unitys.push({
        plant: contract.Planta,
<<<<<<< Updated upstream
        cnpj: (contract['Campo Extra 3'] ?? contract['Campo Extra 4']).replace(/[-\/]/g, ''),
=======
        cnpj: mergedCNPJ,
>>>>>>> Stashed changes
      });
    });

    const unitysCreated = await this.unityRepo.save(unitys);
    console.log(unitysCreated);

    const savedContracts = await this.contractRepo.save(contracts);
    return savedContracts;
  }

  mergeCNPJs(contract: WatterContractPayload): string {
    const campoExtra3: string = contract['Campo Extra 3'] || '';
    const campoExtra4: string = contract['Campo Extra 4'] || '';
    const mergedList: string = (campoExtra3 + campoExtra4).replace(/[\s\-.;,]/g, '');
    const uniqueCNPJs: string = [...new Set(mergedList.split(''))].join('');
    return uniqueCNPJs;
  }
}
