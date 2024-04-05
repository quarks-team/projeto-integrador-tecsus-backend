import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from 'src/domain/entity/billing.entity';
import { BillingController } from './billing.controller';
import { BillingService } from 'src/domain/service/billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [],
})
export class ApiModule {}
