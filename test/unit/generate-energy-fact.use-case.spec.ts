import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateEnergyFact } from '../../src/domain/use-case/generate-energy-fact.use-case';
import { EnergyBillGroupA } from '../../src/domain/entity/energy-bill-group-a.entity';
import { EnergyBillGroupB } from '../../src/domain/entity/energy-bill-group-b.entity';
import { EnergyContract } from '../../src/domain/entity/energy-contract.entity';
import { EnergyFact } from '../../src/domain/entity/energy-fact.entity';

describe('GenerateEnergyFact', () => {
  let useCase: GenerateEnergyFact;
  let billGroupARepo: Repository<EnergyBillGroupA>;
  let billGroupBRepo: Repository<EnergyBillGroupB>;
  let energyContractRepo: Repository<EnergyContract>;
  let energyFactRepo: Repository<EnergyFact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateEnergyFact,
        {
          provide: getRepositoryToken(EnergyBillGroupA),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EnergyBillGroupB),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EnergyContract),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(EnergyFact),
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<GenerateEnergyFact>(GenerateEnergyFact);
    billGroupARepo = module.get<Repository<EnergyBillGroupA>>(
      getRepositoryToken(EnergyBillGroupA),
    );
    billGroupBRepo = module.get<Repository<EnergyBillGroupB>>(
      getRepositoryToken(EnergyBillGroupB),
    );
    energyContractRepo = module.get<Repository<EnergyContract>>(
      getRepositoryToken(EnergyContract),
    );
    energyFactRepo = module.get<Repository<EnergyFact>>(
      getRepositoryToken(EnergyFact),
    );
  });

  describe('execute', () => {
    it('should generate energy fact when contracts and bills exist', async () => {
      jest.spyOn(billGroupARepo, 'count').mockResolvedValue(1);
      jest.spyOn(billGroupBRepo, 'count').mockResolvedValue(1);
      jest.spyOn(energyContractRepo, 'count').mockResolvedValue(1);
      jest.spyOn(energyFactRepo, 'clear').mockResolvedValue(undefined);
      jest.spyOn(energyFactRepo, 'query').mockResolvedValue(undefined);

      await expect(useCase.execute()).resolves.toBeUndefined();
    });

    it('should not generate energy fact when no contracts or bills exist', async () => {
      jest.spyOn(billGroupARepo, 'count').mockResolvedValue(0);
      jest.spyOn(billGroupBRepo, 'count').mockResolvedValue(0);
      jest.spyOn(energyContractRepo, 'count').mockResolvedValue(0);

      await expect(useCase.execute()).resolves.toBeUndefined();
    });
  });
});
