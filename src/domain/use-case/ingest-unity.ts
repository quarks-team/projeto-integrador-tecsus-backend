import { Injectable } from '@nestjs/common';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { EnergyContract } from '../entity/energy-contract.entity';
import { WatterContract } from '../entity/watter-contract.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MergeAndFilterContracts {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(EnergyContract) private readonly energyContractRepo: Repository<EnergyContract>,
    @InjectRepository(WatterContract) private readonly WatterContractRepo: Repository<WatterContract>,
  ) {}

  async execute(energyContracts: EnergyContract[], WatterContracts: WatterContract[]) {
    // Remove null fields from specified columns
    const filteredEnergyContracts = energyContracts.filter((contract) => contract['Campo Extra 3'] && contract['Campo Extra 4'] && contract.plant);
    const filteredWatterContracts = WatterContracts.filter((contract) => contract['Campo Extra 3'] && contract['Campo Extra 4'] && contract.plant);

    // Remove '-', '/', and '.' from specified columns
    filteredEnergyContracts.forEach((contract) => {
      contract['Campo Extra 3'] = contract['Campo Extra 3'].replace(/[-\/.]/g, '');
      contract['Campo Extra 4'] = contract['Campo Extra 4'].replace(/[-\/.]/g, '');
    });

    filteredWatterContracts.forEach((contract) => {
      contract['Campo Extra 3'] = contract['Campo Extra 3'].replace(/[-\/.]/g, '');
      contract['Campo Extra 4'] = contract['Campo Extra 4'].replace(/[-\/.]/g, '');
    });

    // Creating sets of CNPJ and corresponding 'plant' for both contracts
    const energyCnpj1Set = new Set(filteredEnergyContracts.map((contract) => [contract['Campo Extra 3'], contract.plant].toString()));
    const waterCnpj1Set = new Set(filteredWatterContracts.map((contract) => [contract['Campo Extra 3'], contract.plant].toString()));
    const energyCnpj2Set = new Set(filteredEnergyContracts.map((contract) => [contract['Campo Extra 4'], contract.plant].toString()));
    const waterCnpj2Set = new Set(filteredWatterContracts.map((contract) => [contract['Campo Extra 4'], contract.plant].toString()));

    // Merging sets and converting them back to arrays
    const CNPJ1 = [...new Set([...energyCnpj1Set, ...waterCnpj1Set])].map((entry) => entry.split(','));
    const CNPJ2 = [...new Set([...energyCnpj2Set, ...waterCnpj2Set])].map((entry) => entry.split(','));

    return { CNPJ1, CNPJ2 };
  }
}
