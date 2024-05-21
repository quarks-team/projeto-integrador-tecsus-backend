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
  ) { }

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

    for (const unity of this.getDistinctUnitys(unitys)) {
      const existsUnity = await this.unityRepo.findOne({
        where: {
          cnpj: unity.cnpj,
        },
      });
      if (!existsUnity) {
        await this.unityRepo.save(unity);
      }
    }

    for (const placePlant of this.getDistinctPlacePlants(placePlants)) {
      const existsPlacePlant = await this.placePlantRepo.findOne({
        where: {
          plant: placePlant.plant,
        },
      });
      if (!existsPlacePlant) {
        await this.placePlantRepo.save(placePlant);
      }
    }

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

  getDistinctUnitys(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.cnpj === obj.cnpj)
    );
  }

  getDistinctPlacePlants(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.plant === obj.plant)
    );
  }
}
