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
import * as nodePath from 'path'; // Import path module with a different name

@Injectable()
export class BillingService {
  constructor(
    private readonly ingestWatterContract: IngestWatterContract,
    private readonly ingestEnergyContract: IngestEnergyContract,
    private readonly ingestEnergyBill: IngestEnergyBill,
    private readonly ingestWatterBill: IngestWatterBill,
  ) {}

  async transform(fileName: string): Promise<string> {
    const basePath = __dirname.substring(0, __dirname.indexOf('src')); // Get the base directory
    const absolutePath = nodePath.join(basePath, 'src', 'files', fileName); // Construct absolute path

    let bills = [];

    try {
      bills = await csvToJson().fromFile(absolutePath); // Use await with csvToJson().fromFile() directly
    } catch (error) {
      console.error("Error reading CSV file:", error);
      throw new Error("File does not exist. Check to make sure the file path to your CSV is correct.");
    }

    switch (fileName.substring(0, fileName.length - 4)) {
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
      default:
        throw new Error("Invalid file name or type.");
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
