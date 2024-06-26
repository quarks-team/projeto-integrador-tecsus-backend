import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { WatterContractPayload } from '../request/watter-contract-payload';
import { Repository, In } from 'typeorm';
import { WatterContract } from '../entity/watter-contract.entity';
import { PlacePlant } from '../entity/place_plant.entity';

@Injectable()
export class IngestWatterContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(WatterContract)
    private readonly contractRepo: Repository<WatterContract>,
    @InjectRepository(PlacePlant)
    private readonly placePlantRepo: Repository<PlacePlant>,
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
        provider: contract['Fornecedor'],
        cnpj: mergedCNPJ,
      });

      unitys.push({
        cnpj: mergedCNPJ,
      });

      placePlants.push({
        plant: contract.Planta,
      });
    });

    try {
      const distinctUnitys = this.getDistinctUnitys(unitys);
      const existingUnitys = await this.unityRepo.find({
        where: {
          cnpj: In(distinctUnitys.map((unity) => unity.cnpj)),
        },
      });

      const existingUnityMap = new Set(
        existingUnitys.map((unity) => unity.cnpj),
      );
      const newUnitys = distinctUnitys.filter(
        (unity) => !existingUnityMap.has(unity.cnpj),
      );

      await this.unityRepo.save(newUnitys);
    } catch (error) {
      console.error('Error saving unitys:', error);
    }

    try {
      const distinctPlacePlants = this.getDistinctPlacePlants(placePlants);
      const existingPlacePlants = await this.placePlantRepo.find({
        where: {
          plant: In(distinctPlacePlants.map((placePlant) => placePlant.plant)),
        },
      });

      const existingPlacePlantMap = new Set(
        existingPlacePlants.map((placePlant) => placePlant.plant),
      );
      const newPlacePlants = distinctPlacePlants.filter(
        (placePlant) => !existingPlacePlantMap.has(placePlant.plant),
      );

      await this.placePlantRepo.save(newPlacePlants);
    } catch (error) {
      console.error('Error saving place plants:', error);
    }

    try {
      const distinctContracts = this.getDistinctContracts(contracts);
      const existingContracts = await this.contractRepo.find({
        where: distinctContracts.map((contract) => ({
          name: contract.name,
          provider: contract.provider,
          code: contract.code,
          hidrometer: contract.hidrometer,
        })),
      });

      const existingContractMap = new Set(
        existingContracts.map(
          (contract) =>
            `${contract.name}-${contract.provider}-${contract.code}-${contract.hidrometer}`,
        ),
      );

      const newContracts = distinctContracts.filter(
        (contract) =>
          !existingContractMap.has(
            `${contract.name}-${contract.provider}-${contract.code}-${contract.hidrometer}`,
          ),
      );

      await this.contractRepo.save(newContracts);
    } catch (error) {
      console.error('Error saving contracts:', error);
    }

    return {
      unitys,
      contracts,
    };
  }

  mergeCNPJs(contract: WatterContractPayload): string {
    const campoExtra3: string = contract['Campo Extra 3'] || '';
    const campoExtra4: string = contract['Campo Extra 4'] || '';
    const mergedList: string = (campoExtra3 + campoExtra4).replace(
      /[^\d]/g,
      '',
    );
    const uniqueCNPJs: string = [...new Set(mergedList.split(''))].join('');
    return uniqueCNPJs;
  }

  getDistinctUnitys(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.cnpj === obj.cnpj),
    );
  }

  getDistinctPlacePlants(array) {
    return array.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.plant === obj.plant),
    );
  }

  getDistinctContracts(array) {
    return array.filter(
      (obj, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.name === obj.name &&
            t.provider === obj.provider &&
            t.hidrometer === obj.hidrometer &&
            t.code === obj.code,
        ),
    );
  }
}
