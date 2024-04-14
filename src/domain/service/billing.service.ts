import { Injectable } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from '../entity/billing.entity';
import * as csvToJson from 'csvtojson';
import { writeFileSync } from 'fs';
import { WatterContract } from '../request/watter-contract';
import { EnergyContract } from '../request/energy-contract';
import { EnergyBill } from '../request/energy-bill';
import { WatterBill } from '../request/watter-bill';
import { IngestWatterContract } from '../use-case/ingest-watter-contracts.use-case';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing) private readonly repo: MongoRepository<Billing>,
    private readonly ingestWatterContract: IngestWatterContract,
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
        const watterContracts: WatterContract[] = bills;
        await this.ingestWatterContract.execute(watterContracts);

        break;
      case 'con_energia':
        const energyContracts: EnergyContract[] = bills;
        this.transformEnergyContract(energyContracts);
        break;
      case 'pro_energia':
        const energyBills: EnergyBill[] = bills;
        this.transformEnergyValues(energyBills);
        break;
      case 'pro_agua':
        const watterBills: WatterBill[] = bills;
        this.transformWatterValues(watterBills);
        break;
    }
    // for (const bill of bills) {
    //   console.log('BIll', bill);
    //   const teste = await this.repo.insert(bill);
    // }

    // const all = await this.repo.find();

    // console.log(all);
    return 'Hello World!';
  }
  transformWatterValues(bills: WatterBill[]) {
    console.log(bills);
    throw new Error('Method not implemented.');
  }
  transformEnergyValues(bills: EnergyBill[]) {
    //campos a serem mapeados
    const fields = ['Total', 'Consumo FP CAP VD'];

    //mapeio os contratos [bills]
    bills = bills.map((bill) => {
      fields.forEach((field) => {
        bill[field] = Number.parseFloat(bill[field].replace(',', ''));
      });
      return { ...bill };
    });

    console.log(
      'Total 13---',
      bills[13].Total,
      '---type----',
      typeof bills[13].Total,
    );
    console.log(
      'Consumo FP CAP VD---',
      bills[13]['Consumo FP CAP VD'],
      '---Consumo FP CAP VD----',
      typeof bills[13]['Consumo FP CAP VD'],
    );

    throw new Error('Method not implemented.');
  }
  transformEnergyContract(bills: EnergyContract[]) {
    console.log(bills);
    throw new Error('Method not implemented.');
  }
  transformWatterContract(bills: WatterContract[]) {
    console.log(bills);
    throw new Error('Method not implemented.');
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
