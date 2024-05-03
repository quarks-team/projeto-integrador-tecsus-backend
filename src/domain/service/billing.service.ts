import { Injectable } from '@nestjs/common';
import * as csvToJson from 'csvtojson';
import { WatterContractPayload } from '../request/watter-contract.payload'; // Changed from 'watter-contract-payload'
import { EnergyContractPayload } from '../request/energy-contract.payload'; // Changed from 'energy-contract-payload'
import { EnergyBillPayload } from '../request/energy-bill.payload'; // Changed from 'energy-bill-payload'
import { WatterBillPayload } from '../request/watter-bill.payload'; // Changed from 'watter-bill-payload'
import { IngestWatterContract } from '../use-case/ingest-watter-contract.use-case'; // Changed from 'ingest-watter-contracts.use-case'
import { IngestEnergyContract } from '../use-case/ingest-energy-contract.use-case';
import { IngestEnergyBill } from '../use-case/ingest-energy-bill.use-case';
import { IngestWatterBill } from '../use-case/ingest-watter-bill.use-case';

@Injectable()
export class BillingService {
  constructor(
    private readonly ingestWatterContract: IngestWatterContract,
    private readonly ingestEnergyContract: IngestEnergyContract,
    private readonly ingestEnergyBill: IngestEnergyBill,
    private readonly ingestWatterBill: IngestWatterBill,
  ) {}
  async transform(path: string): Promise<string> {
    const absolutePath = `${__dirname.substring(0, 57)}/src/files/${path}`;

    let bills = [];

    await csvToJson()
      .fromFile(absolutePath)
      .then((obj) => {
        bills = obj;
      });

    switch (path.substring(0, path.length - 4)) {
      case 'con_agua':
        const watterContracts: WatterContractPayload[] = bills;
        await this.ingestWatterContract.execute(watterContracts);

        break;
      case 'con_energia':
        const energyContracts: EnergyContractPayload[] = bills;
        await this.ingestEnergyContract.execute(energyContracts);
        break;
      case 'pro_energia':
        const energyBills: EnergyBillPayload[] = bills;
        await this.ingestEnergyBill.execute(energyBills);
        break;
      case 'pro_agua':
        const watterBills: WatterBillPayload[] = bills;
        await this.ingestWatterBill.execute(watterBills);
        break;
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
