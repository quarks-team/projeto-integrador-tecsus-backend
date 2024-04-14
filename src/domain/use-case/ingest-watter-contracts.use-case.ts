import { InjectRepository } from '@nestjs/typeorm';
import { Concessionaire } from '../entity/concessionaire.entity';
import { Contract } from '../entity/contract.entity';
import { Unity } from '../entity/unity.entity';
import { WatterContract } from '../request/watter-contract';
import { MongoRepository } from 'typeorm';

export class IngestWatterContract {
  constructor(
    @InjectRepository(Unity) private readonly unityRepo: MongoRepository<Unity>,
    @InjectRepository(Concessionaire)
    private readonly concessionaireRepo: MongoRepository<Concessionaire>,
    @InjectRepository(Contract)
    private readonly contractRepo: MongoRepository<Contract>,
  ) {}
  async execute(watterContracts: WatterContract[]) {
    const concessionaires: Partial<Concessionaire>[] = [];
    const contracts: Partial<Contract>[] = [];
    const unitys: Partial<Unity>[] = [];

    watterContracts.forEach((contract) => {
      concessionaires.push({
        name: contract.Fornecedor,
        type: contract['Tipo de Consumidor'],
      });

      unitys.push({
        name: contract['Nome do Contrato'],
        code: contract['Código de Ligação (RGI)'],
      });

      contracts.push({ contractName: contract['Nome do Contrato'] });
    });

    const unitysCreated = await this.unityRepo.insertMany(unitys);

    const concessionaireCreated =
      await this.concessionaireRepo.insertMany(concessionaires);

    let count = 0;
    const mappedContracs = contracts.map((contract: Contract) => {
      return {
        concessionaireId: concessionaireCreated.insertedIds[count],
        unityId: unitysCreated.insertedIds[count],
        contractName: contract.contractName,
      };
    });
    await this.contractRepo.insertMany(mappedContracs);
  }
}
