import { Test, TestingModule } from '@nestjs/testing';
import { BillingService } from '../../src/domain/service/billing.service';
import { IngestWatterContract } from '../../src/domain/use-case/ingest-watter-contracts.use-case';
import { IngestEnergyContract } from '../../src/domain/use-case/ingest-energy-contract.use-case';
import { IngestEnergyBill } from '../../src/domain/use-case/ingest-energy-bill.use-case';
import { IngestWatterBill } from '../../src/domain/use-case/ingest-watter-bill.use-case';
import { GenerateEnergyFact } from '../../src/domain/use-case/generate-energy-fact.use-case';
import { GenerateWatterFact } from '../../src/domain/use-case/generate-watter-fact.use-case';

describe('BillingService', () => {
  let service: BillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingService,
        {
          provide: IngestWatterContract,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IngestEnergyContract,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IngestEnergyBill,
          useValue: { execute: jest.fn() },
        },
        {
          provide: IngestWatterBill,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GenerateEnergyFact,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GenerateWatterFact,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<BillingService>(BillingService);
  });

  describe('transform', () => {
    it('should transform water contracts', async () => {
      const log = jest.fn();
      const fileName = 'con_agua.csv';
      const path = 'path/to/file';

      jest
        .spyOn(service, 'transform')
        .mockResolvedValue('billing-ingestion: hmm good ingestion');

      await expect(service.transform(fileName, path, log)).resolves.toBe(
        'billing-ingestion: hmm good ingestion',
      );
    });

    it('should throw an error for invalid file type', async () => {
      const log = jest.fn();
      const fileName = 'invalid.csv';
      const path = 'path/to/file';

      await expect(service.transform(fileName, path, log)).rejects.toThrow(
        'invalid.csv: Falha ao carregar dados do arquivo.',
      );
    });
  });
});
