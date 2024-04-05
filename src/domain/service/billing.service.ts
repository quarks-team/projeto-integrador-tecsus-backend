import { Injectable } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Billing } from '../entity/billing.entity';
import * as csvToJson from 'csvtojson';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing) private readonly repo: MongoRepository<Billing>,
  ) {}
  async transform(path: string): Promise<string> {
    const absolutePath = `${__dirname.substring(0, 57)}/src/files/${path}`;
    let bills = [];
    await csvToJson()
      .fromFile(absolutePath)
      .then((obj) => {
        // console.log(obj[0])
        // const conta = obj[0]
        // console.log(JSON.stringify(Object.keys(obj[0])));
        bills = obj;

        // const fornecedor = {
        //     contrato: conta['Nome do Contrato'],
        //     fornecedor: conta.Fornecedor
        // }
        // console.log('Fornecedor',fornecedor)
      });
    for (const bill of bills) {
      console.log('BIll', bill);
      const teste = await this.repo.insert(bill);
    }
    //   const teste = await this.repo.insert({
    //     gasId: 1,
    //     watterId: 1,
    //     energyId: 0,
    //     timeId: 1,
    //     value: 'R$ 500,00',
    //   });

    const all = await this.repo.find();
    console.log(all);
    return 'Hello World!';
  }
}
