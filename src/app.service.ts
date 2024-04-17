import { Injectable } from '@nestjs/common';
import { MongoRepository, Repository } from 'typeorm';
import { Billing } from './domain/entity/billing.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Billing) private readonly repo: MongoRepository<Billing>,
  ) {}
  async getHello(): Promise<string> {
    const teste = await this.repo.insert({
      gasId: 1,
      watterId: 1,
      energyId: 0,
      timeId: 1,
      value: 'R$ 500,00',
    });
    const all = await this.repo.find();
    console.log(all, teste);
    return 'Hello World!';
  }
}
