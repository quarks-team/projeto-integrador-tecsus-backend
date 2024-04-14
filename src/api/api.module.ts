import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from 'src/domain/entity/billing.entity';
import { BillingController } from './billing.controller';
import { BillingService } from 'src/domain/service/billing.service';
import { IngestWatterContract } from 'src/domain/use-case/ingest-watter-contracts.use-case';
import { Unity } from 'src/domain/entity/unity.entity';
import { Concessionaire } from 'src/domain/entity/concessionaire.entity';
import { Contract } from 'src/domain/entity/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Billing]),
    TypeOrmModule.forFeature([Unity]),
    TypeOrmModule.forFeature([Concessionaire]),
    TypeOrmModule.forFeature([Contract]),
  ],
  controllers: [BillingController],
  providers: [BillingService, IngestWatterContract],
  exports: [],
})
export class ApiModule {}
