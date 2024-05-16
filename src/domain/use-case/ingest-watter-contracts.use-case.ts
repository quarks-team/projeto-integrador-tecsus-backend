import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { WatterContractPayload } from '../request/watter-contract-payload';
import { Repository } from 'typeorm';
import { WatterContract } from '../entity/watter-contract.entity';
import { PlacePlant } from '../entity/place_plant.entity';

@Injectable()
export class IngestWatterContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(WatterContract) private readonly contractRepo: Repository<WatterContract>,
    @InjectRepository(PlacePlant) private readonly placePlantRepo: Repository<PlacePlant>,
  ) {}

  async execute(watterContracts: WatterContractPayload[]) {
    const unitys: Partial<Unity>[] = [];
    const contracts: Partial<WatterContract>[] = [];
    const placePlants: Partial<PlacePlant>[] = [];

    watterContracts.forEach((contract) => {
      const mergedCNPJ = this.mergeCNPJs(contract);
      contracts.push({
        name: contract['Nome do Contrato'],
        code: contract['Código de Ligação (RGI)'].replace(/[-\/]/g, ''),
        hidrometer: contract['Hidrômetro'],
        provider: contract['Fornecedor']
      });

      unitys.push({
        cnpj: mergedCNPJ
      });

      placePlants.push({
        plant: contract.Planta
      });

    });

    const unitysCreated = await this.unityRepo.save(unitys);
    console.log(unitysCreated);

    const plantsCreated = await this.placePlantRepo.save(placePlants);
    console.log(plantsCreated);

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
