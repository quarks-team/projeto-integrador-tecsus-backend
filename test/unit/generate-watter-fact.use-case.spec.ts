import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateWatterFact } from '../../src/domain/use-case/generate-watter-fact.use-case';
import { WatterBill } from '../../src/domain/entity/watter-bill.entity';
import { WatterContract } from '../../src/domain/entity/watter-contract.entity';
import { WatterFact } from '../../src/domain/entity/watter-fact.entity';

describe('GenerateWatterFact', () => {
  let useCase: GenerateWatterFact;
  let billRepo: Repository<WatterBill>;
  let contractRepo: Repository<WatterContract>;
  let factRepo: Repository<WatterFact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateWatterFact,
        {
          provide: getRepositoryToken(WatterBill),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(WatterContract),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(WatterFact),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<GenerateWatterFact>(GenerateWatterFact);
    billRepo = module.get<Repository<WatterBill>>(
      getRepositoryToken(WatterBill),
    );
    contractRepo = module.get<Repository<WatterContract>>(
      getRepositoryToken(WatterContract),
    );
    factRepo = module.get<Repository<WatterFact>>(
      getRepositoryToken(WatterFact),
    );
  });

  describe('execute', () => {
    it('should generate water fact when contracts and bills exist', async () => {
      jest.spyOn(billRepo, 'count').mockResolvedValue(1);
      jest.spyOn(contractRepo, 'count').mockResolvedValue(1);
      jest.spyOn(factRepo, 'clear').mockResolvedValue(undefined);
      jest.spyOn(factRepo, 'query').mockResolvedValue(undefined);

      await expect(useCase.execute()).resolves.toBeUndefined();
    });

    it('should not generate water fact when no contracts or bills exist', async () => {
      jest.spyOn(billRepo, 'count').mockResolvedValue(0);
      jest.spyOn(contractRepo, 'count').mockResolvedValue(0);

      await expect(useCase.execute()).resolves.toBeUndefined();
    });
  });
});
