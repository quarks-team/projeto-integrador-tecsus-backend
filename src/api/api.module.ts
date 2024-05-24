import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from 'src/domain/service/billing.service';
import { IngestWatterContract } from 'src/domain/use-case/ingest-watter-contracts.use-case';
import { Unity } from 'src/domain/entity/unity.entity';
import { PlacePlant } from 'src/domain/entity/place_plant.entity';
import { WatterContract } from 'src/domain/entity/watter-contract.entity';
import { EnergyContract } from 'src/domain/entity/energy-contract.entity';
import { IngestEnergyContract } from 'src/domain/use-case/ingest-energy-contract.use-case';
import { EnergyBillGroupA } from 'src/domain/entity/energy-bill-group-a.entity';
import { EnergyBillGroupB } from 'src/domain/entity/energy-bill-group-b.entity';
import { Time } from 'src/domain/entity/time.entity';
import { IngestEnergyBill } from 'src/domain/use-case/ingest-energy-bill.use-case';
import { WatterBill } from 'src/domain/entity/watter-bill.entity';
import { IngestWatterBill } from 'src/domain/use-case/ingest-watter-bill.use-case';
import { WatterFact } from 'src/domain/entity/watter-fact.entity';
import { GenerateWatterFact } from 'src/domain/use-case/generate-watter-fact.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unity]),
    TypeOrmModule.forFeature([WatterContract]),
    TypeOrmModule.forFeature([EnergyContract]),
    TypeOrmModule.forFeature([EnergyBillGroupA]),
    TypeOrmModule.forFeature([EnergyBillGroupB]),
    TypeOrmModule.forFeature([PlacePlant]),
    TypeOrmModule.forFeature([WatterBill]),
    TypeOrmModule.forFeature([Time]),
    TypeOrmModule.forFeature([WatterFact]),
  ],
  controllers: [BillingController],
  providers: [
    BillingService,
    IngestWatterContract,
    IngestEnergyContract,
    IngestEnergyBill,
    IngestWatterBill,
    GenerateWatterFact,
  ],
  exports: [],
})
export class ApiModule {}
