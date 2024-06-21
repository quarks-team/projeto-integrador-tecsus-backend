import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from '../domain/service/billing.service';
import { IngestWatterContract } from '../domain/use-case/ingest-watter-contracts.use-case';
import { Unity } from '../domain/entity/unity.entity';
import { PlacePlant } from '../domain/entity/place_plant.entity';
import { WatterContract } from '../domain/entity/watter-contract.entity';
import { EnergyContract } from '../domain/entity/energy-contract.entity';
import { IngestEnergyContract } from '../domain/use-case/ingest-energy-contract.use-case';
import { EnergyBillGroupA } from '../domain/entity/energy-bill-group-a.entity';
import { EnergyBillGroupB } from '../domain/entity/energy-bill-group-b.entity';
import { Time } from '../domain/entity/time.entity';
import { IngestEnergyBill } from '../domain/use-case/ingest-energy-bill.use-case';
import { WatterBill } from '../domain/entity/watter-bill.entity';
import { IngestWatterBill } from '../domain/use-case/ingest-watter-bill.use-case';
import { EnergyFact } from '../domain/entity/energy-fact.entity';
import { GenerateEnergyFact } from '../domain/use-case/generate-energy-fact.use-case';
import { WatterFact } from '../domain/entity/watter-fact.entity';
import { GenerateWatterFact } from '../domain/use-case/generate-watter-fact.use-case';
import { AlertController } from './alert.controller';
import { WatterAlert } from '../domain/entity/watter-alerts.entity';
import { AlertService } from '../domain/service/alert.service';
import { WastepipeAlert } from '../domain/entity/wastepipe-alert.entity';
import { AEnergyConsumeAlert } from '../domain/entity/a-energy-alerts.entity';
import { BEnergyConsumeAlert } from '../domain/entity/b-energy-alerts.entity';
import { EnergyDemandAlert } from '../domain/entity/demand-alerts.entity';

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
    TypeOrmModule.forFeature([EnergyFact]),
    TypeOrmModule.forFeature([WatterFact]),
    TypeOrmModule.forFeature([WatterAlert]),
    TypeOrmModule.forFeature([WastepipeAlert]),
    TypeOrmModule.forFeature([AEnergyConsumeAlert]),
    TypeOrmModule.forFeature([BEnergyConsumeAlert]),
    TypeOrmModule.forFeature([EnergyDemandAlert]),
  ],
  controllers: [BillingController, AlertController],
  providers: [
    BillingService,
    IngestWatterContract,
    IngestEnergyContract,
    IngestEnergyBill,
    IngestWatterBill,
    GenerateEnergyFact,
    GenerateWatterFact,
    AlertService,
  ],
  exports: [],
})
export class ApiModule {}
