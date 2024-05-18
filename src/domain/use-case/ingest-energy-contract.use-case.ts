import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { EnergyContractPayload } from '../request/energy-contract-payload';
import { EnergyContract } from '../entity/energy-contract.entity';
import { PlacePlant } from '../entity/place_plant.entity';

@Injectable()
export class IngestEnergyContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(EnergyContract) private readonly contractRepo: Repository<EnergyContract>,
    @InjectRepository(PlacePlant) private readonly placePlantRepo: Repository<PlacePlant>,
  ) {}

  async execute(energyContracts: EnergyContractPayload[]) {
    const unitys: Partial<Unity>[] = [];
    const contracts: Partial<EnergyContract>[] = [];
    const placePlants: Partial<PlacePlant>[] = [];


    energyContracts.forEach((contract) => {
      const mergedCNPJ = this.mergeCNPJs(contract);
      contracts.push({
        name: contract['Nome do Contrato'],
        provider: contract.Fornecedor,
        medidorNumber: contract['Número Medidor'],
        instalationNumber: contract['Número Instalação'],
        pointDemand: Number.parseFloat(
          contract['Demanda Ponta'].replace(',', '')
        ),
        outsidePointDemand: Number.parseFloat(
          contract['Demanda Fora Ponta'].replace(',', '')
        ),
        cnpj: mergedCNPJ
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

  mergeCNPJs(contract: EnergyContractPayload): string {
    const campoExtra3: string = contract['Campo Extra 3'] || '';
    const campoExtra4: string = contract['Campo Extra 4'] || '';
    const mergedList: string = (campoExtra3 + campoExtra4).replace(/[^\d]/g, '');
    const uniqueCNPJs: string = [...new Set(mergedList.split(''))].join('');
    return uniqueCNPJs;
  }
}
