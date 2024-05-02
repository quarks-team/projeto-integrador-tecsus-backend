import { Injectable } from '@nestjs/common';
import * as csvToJson from 'csvtojson';
import { WatterContractPayload } from '../request/watter-contract-payload';
import { EnergyContractPayload } from '../request/energy-contract-payload';
import { EnergyBillPayload } from '../request/energy-bill-payload';
import { WatterBillPayload } from '../request/watter-bill-payload';
import { IngestWatterContract } from '../use-case/ingest-watter-contracts.use-case';
import { IngestEnergyContract } from '../use-case/ingest-energy-contract.use-case';
import { IngestEnergyBill } from '../use-case/ingest-energy-bill.use-case';
import { IngestWatterBill } from '../use-case/ingest-watter-bill.use-case';
import { Unity } from '../entity/unity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MergeAndFilterContracts } from './merge-and-filter-contracts.service';

@Injectable()
export class BillingService {
  constructor(
    private readonly ingestWatterContract: IngestWatterContract,
    private readonly ingestEnergyContract: IngestEnergyContract,
    private readonly ingestEnergyBill: IngestEnergyBill,
    private readonly ingestWatterBill: IngestWatterBill,
    private readonly mergeAndFilterContracts: MergeAndFilterContracts,
    @InjectRepository(Unity) private readonly unityRepo: Repository<Unity>,
  ) {}

  async transformAndPersist(path: string): Promise<string> {
    const absolutePath = `${__dirname.substring(0, 57)}/src/files/${path}`;

    let data = [];

    await csvToJson()
      .fromFile(absolutePath)
      .then((obj) => {
        data = obj;
      });

    switch (path.substring(0, path.length - 4)) {
      case 'con_agua':
        const waterContracts: WatterContractPayload[] = data;
        await this.persistWaterContracts(waterContracts);
        break;
      case 'con_energia':
        const energyContracts: EnergyContractPayload[] = data;
        await this.persistEnergyContracts(energyContracts);
        break;
      case 'pro_energia':
        const energyBills: EnergyBillPayload[] = data;
        await this.persistEnergyBills(energyBills);
        break;
      case 'pro_agua':
        const waterBills: WatterBillPayload[] = data;
        await this.persistWaterBills(waterBills);
        break;
    }
    return 'billing-ingestion: Data persisted successfully';
  }

  private async persistWaterContracts(data: WatterContractPayload[]): Promise<void> {
    const mergedAndFilteredContracts = this.mergeAndFilterContracts.execute(data);
    const contracts = await this.ingestWatterContract.execute(mergedAndFilteredContracts);
    // Additional processing or logging if needed
  }

  private async persistEnergyContracts(data: EnergyContractPayload[]): Promise<void> {
    const mergedAndFilteredContracts = this.mergeAndFilterContracts.execute(data);
    const contracts = await this.ingestEnergyContract.execute(mergedAndFilteredContracts);
    // Additional processing or logging if needed
  }

  private async persistEnergyBills(data: EnergyBillPayload[]): Promise<void> {
    const bills = await this.ingestEnergyBill.execute(data);
    // Additional processing or logging if needed
  }

  private async persistWaterBills(data: WatterBillPayload[]): Promise<void> {
    const bills = await this.ingestWatterBill.execute(data);
    // Additional processing or logging if needed
  }
}
