import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from './billing.controller';
import { BillingService } from './../domain/service/billing.service';
import { GenerateEnergyFact } from '../domain/use-case/generate-energy-fact.use-case';
import { GenerateWatterFact } from '../domain/use-case/generate-watter-fact.use-case';
import { IngestEnergyBill } from '../domain/use-case/ingest-energy-bill.use-case';
import { IngestEnergyContract } from '../domain/use-case/ingest-energy-contract.use-case';
import { IngestWatterBill } from '../domain/use-case/ingest-watter-bill.use-case';
import { IngestWatterContract } from '../domain/use-case/ingest-watter-contracts.use-case';
import { ConfigService } from '@nestjs/config';

describe('BillingController', () => {
  let billingService: BillingService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BillingController],
      providers: [
        BillingService,
        IngestWatterContract,
        IngestEnergyContract,
        IngestEnergyBill,
        IngestWatterBill,
        GenerateEnergyFact,
        GenerateWatterFact,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'FOO') {
                return 123;
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    billingService = app.get<BillingService>(BillingService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        billingService.transform(
          'con_agua',
          `/Users/lucas.barcelos/dev/fatec/billing-ingestion-service/src/files/con_agua.csv`,
        ),
      ).toBe('Hello World!');
    });
  });
});
