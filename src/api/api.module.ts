import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingController } from './billing.controller';
import { BillingService } from 'src/domain/service/billing.service';
import { IngestWatterContract } from 'src/domain/use-case/ingest-watter-contracts.use-case';
import { Unity } from 'src/domain/entity/unity.entity';
import { WatterContract } from 'src/domain/entity/watter-contract.entity';
import { EnergyContract } from 'src/domain/entity/energy-contract.entity';
import { IngestEnergyContract } from 'src/domain/use-case/ingest-energy-contract.use-case';
import { EnergyBill } from 'src/domain/entity/energy-bill.entity';
import { Time } from 'src/domain/entity/time.entity';
import { IngestEnergyBill } from 'src/domain/use-case/ingest-energy-bill.use-case';
import { WatterBill } from 'src/domain/entity/watter-bill.entity';
import { IngestWatterBill } from 'src/domain/use-case/ingest-watter-bill.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unity]),
    TypeOrmModule.forFeature([WatterContract]),
    TypeOrmModule.forFeature([EnergyContract]),
    TypeOrmModule.forFeature([EnergyBill]),
    TypeOrmModule.forFeature([WatterBill]),
    TypeOrmModule.forFeature([Time]),
  ],
  controllers: [BillingController],
  providers: [
    BillingService,
    IngestWatterContract,
    IngestEnergyContract,
    IngestEnergyBill,
    IngestWatterBill,
  ],
  exports: [],
})
export class ApiModule {}
