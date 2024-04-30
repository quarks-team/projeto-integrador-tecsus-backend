import { InjectRepository } from '@nestjs/typeorm';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { EnergyContractPayload } from '../request/energy-contract-payload';
import { EnergyContract } from '../entity/energy-contract.entity';

export class IngestEnergyContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
    @InjectRepository(EnergyContract)
    private readonly contractRepo: Repository<EnergyContract>,
  ) {}
  async execute(watterContracts: EnergyContractPayload[]) {
    const unitys: Partial<Unity>[] = [];
    const contracts: Partial<EnergyContract>[] = [];

    watterContracts.forEach((contract) => {
      contracts.push({
        name: contract['Nome do Contrato'],
        provider: contract.Fornecedor,
        medidorNumber: contract['Número Medidor'],
        tension: contract['Tensão Contratada (V)'],
        metricUnity: contract['Unidade Métrica'],
        cnpj: contract['Campo Extra 3'] ?? contract['Campo Extra 4'],
        plant: contract.Planta,
      });

      unitys.push({
        plant: contract.Planta,
        cnpj: contract['Campo Extra 3'] ?? contract['Campo Extra 4'],
      });
    });

    const unitysCreated = await this.unityRepo.save(unitys);
    console.log(unitysCreated);

    const savedContracts = await this.contractRepo.save(contracts);
    return savedContracts;
  }
}
