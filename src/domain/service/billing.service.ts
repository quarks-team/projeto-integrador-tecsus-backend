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
import { GenerateEnergyFact } from '../use-case/generate-energy-fact.use-case';

@Injectable()
export class BillingService {
  constructor(
    private readonly ingestWatterContract: IngestWatterContract,
    private readonly ingestEnergyContract: IngestEnergyContract,
    private readonly ingestEnergyBill: IngestEnergyBill,
    private readonly ingestWatterBill: IngestWatterBill,
    private readonly generateEnergyFact: GenerateEnergyFact,
  ) {}
  async transform(fileName: string, path: string): Promise<string> {
    let bills = [];

    await csvToJson()
      .fromFile(path)
      .then((obj) => {
        bills = obj;
      });

    switch (fileName.substring(0, fileName.length - 4)) {
      case 'con_agua':
        const watterContracts: WatterContractPayload[] = bills;
        await this.ingestWatterContract.execute(watterContracts);
        break;
      case 'con_energia':
        const energyContracts: EnergyContractPayload[] = bills;
        await this.ingestEnergyContract.execute(energyContracts);
        await this.generateEnergyFact.execute();
        break;
      case 'pro_energia':
        const energyBills: EnergyBillPayload[] = bills;
        await this.ingestEnergyBill.execute(energyBills);
        await this.generateEnergyFact.execute();
        break;
      case 'pro_agua':
        const watterBills: WatterBillPayload[] = bills;
        await this.ingestWatterBill.execute(watterBills);
        break;
      default:
        throw new Error('Invalid file name or type.');
    }

    return 'billing-ingestion: hmm good ingestion';
  }

  parseObj(obj: any[]): any {
    const first = obj[0];
    const keys = Object.keys(first);
    const dictionary = keys.map((key) => {
      return {
        key: key,
        type: typeof first[key],
      };
    });
    return dictionary;
  }
}
