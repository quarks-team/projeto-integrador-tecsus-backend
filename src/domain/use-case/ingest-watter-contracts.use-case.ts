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
  ) { }

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
        provider: contract['Fornecedor'],
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
        const unitysCreated = await this.unityRepo.save(unity);
        console.log(unitysCreated);
      }
    }

    for (const placePlant of this.getDistinctPlacePlants(placePlants)) {
      const existsPlacePlant = await this.placePlantRepo.findOne({
        where: {
          plant: placePlant.plant,
        },
      });
      if (!existsPlacePlant) {
        const plantsCreated = await this.placePlantRepo.save(placePlant);
        console.log(plantsCreated);
      }
    }

    for (const contract of this.getDistinctContracts(contracts)) {
      const existsContract = await this.contractRepo.findOne({
        where: {
          name: contract.name,
          provider: contract.provider,
          code: contract.code,
          hidrometer: contract.hidrometer
        },
      });
      if (!existsContract) {
        const savedContracts = await this.contractRepo.save(contracts);
        return savedContracts;
      }
    }
  }

  mergeCNPJs(contract: WatterContractPayload): string {
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

  getDistinctContracts(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex(
          (t) =>
            t.name === obj.name &&
            t.provider === obj.provider &&
            t.hidrometer === obj.hidrometer &&
            t.code === obj.code
        )
    );
  }
}
