import { Injectable } from '@nestjs/common';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { EnergyContract } from '../entity/energy-contract.entity';
import { WaterContract } from '../entity/watter-contract.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MergeAndFilterContracts {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(EnergyContract) private readonly energyContractRepo: Repository<EnergyContract>,
    @InjectRepository(WaterContract) private readonly waterContractRepo: Repository<WaterContract>,
  ) {}

  async execute(energyContracts: EnergyContract[], waterContracts: WaterContract[]) {
    // Remove null fields from specified columns
    const filteredEnergyContracts = energyContracts.filter((contract) => contract['Campo Extra 3'] && contract['Campo Extra 4'] && contract.Planta);
    const filteredWaterContracts = waterContracts.filter((contract) => contract['Campo Extra 3'] && contract['Campo Extra 4'] && contract.Planta);

    // Remove '-', '/', and '.' from specified columns
    filteredEnergyContracts.forEach((contract) => {
      contract['Campo Extra 3'] = contract['Campo Extra 3'].replace(/[-\/.]/g, '');
      contract['Campo Extra 4'] = contract['Campo Extra 4'].replace(/[-\/.]/g, '');
    });

    filteredWaterContracts.forEach((contract) => {
      contract['Campo Extra 3'] = contract['Campo Extra 3'].replace(/[-\/.]/g, '');
      contract['Campo Extra 4'] = contract['Campo Extra 4'].replace(/[-\/.]/g, '');
    });

    // Creating sets of CNPJ and corresponding 'Planta' for both contracts
    const energyCnpj1Set = new Set(filteredEnergyContracts.map((contract) => [contract['Campo Extra 3'], contract.Planta].toString()));
    const waterCnpj1Set = new Set(filteredWaterContracts.map((contract) => [contract['Campo Extra 3'], contract.Planta].toString()));
    const energyCnpj2Set = new Set(filteredEnergyContracts.map((contract) => [contract['Campo Extra 4'], contract.Planta].toString()));
    const waterCnpj2Set = new Set(filteredWaterContracts.map((contract) => [contract['Campo Extra 4'], contract.Planta].toString()));

    // Merging sets and converting them back to arrays
    const CNPJ1 = [...new Set([...energyCnpj1Set, ...waterCnpj1Set])].map((entry) => entry.split(','));
    const CNPJ2 = [...new Set([...energyCnpj2Set, ...waterCnpj2Set])].map((entry) => entry.split(','));

    return { CNPJ1, CNPJ2 };
  }
}
