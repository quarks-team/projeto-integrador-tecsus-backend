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
import { EnergyFact } from 'src/domain/entity/energy-fact.entity';
import { GenerateEnergyFact } from 'src/domain/use-case/generate-energy-fact.use-case';
import { WatterFact } from 'src/domain/entity/watter-fact.entity';
import { GenerateWatterFact } from 'src/domain/use-case/generate-watter-fact.use-case';
import { AlertController } from './alert.controller';
import { WatterAlert } from 'src/domain/entity/watter-alerts.entity';
import { AlertService } from 'src/domain/service/alert.service';
import { WastepipeAlert } from 'src/domain/entity/wastepipe-alert.entity';
import { AEnergyConsumeAlert } from 'src/domain/entity/a-energy-alerts.entity';
import { BEnergyConsumeAlert } from '../domain/entity/b-energy-alerts.entity';

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
