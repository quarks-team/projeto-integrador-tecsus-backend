import { Test, TestingModule } from '@nestjs/testing';
import { IngestEnergyBill } from './IngestEnergyBill';
import { Repository } from 'typeorm';
import { EnergyBill } from '../entity/energy-bill.entity';
import { EnergyBillPayload } from '../request/energy-bill-payload';
import { Time } from '../entity/time.entity';

describe('IngestEnergyBill', () => {
  let ingestEnergyBill: IngestEnergyBill;
  let timeRepoMock: Repository<Time>;
  let billRepoMock: Repository<EnergyBill>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        IngestEnergyBill,
        {
          provide: 'TimeRepository', // Provide a token for the Time repository
          useClass: Repository, // Use a mock class for Repository
        },
        {
          provide: 'EnergyBillRepository', // Provide a token for the EnergyBill repository
          useClass: Repository, // Use a mock class for Repository
        },
      ],
    }).compile();

    ingestEnergyBill = moduleFixture.get<IngestEnergyBill>(IngestEnergyBill);
    timeRepoMock = moduleFixture.get<Repository<Time>>('TimeRepository');
    billRepoMock = moduleFixture.get<Repository<EnergyBill>>('EnergyBillRepository');
  });

  describe('execute', () => {
    it('should insert all energy bills when the database is empty', async () => {
      // Mock timeRepo to return an empty array
      timeRepoMock.find = jest.fn().mockResolvedValue([]);

      const energyBills: EnergyBillPayload[] = [/* Insert test data here */];

      await ingestEnergyBill.execute(energyBills);

      // Assert that all energy bills were saved
      expect(timeRepoMock.save).toHaveBeenCalledWith(/* Expected times array */);
      // Add more assertions as needed
    });

    it('should insert only new energy bills when some already exist in the database', async () => {
      // Mock timeRepo to return some existing records
      const existingRecords: Partial<Time>[] = [/* Insert existing records here */];
      timeRepoMock.find = jest.fn().mockResolvedValue(existingRecords);

      const energyBills: EnergyBillPayload[] = [/* Insert test data here */];

      await ingestEnergyBill.execute(energyBills);

      // Assert that only new energy bills were saved
      expect(timeRepoMock.save).toHaveBeenCalledWith(/* Expected times array */);
      // Add assertions to verify only new bills were saved
    });

    it('should not insert any energy bills when all already exist in the database', async () => {
      // Mock timeRepo to return all existing records
      const existingRecords: Partial<Time>[] = [/* Insert existing records here */];
      timeRepoMock.find = jest.fn().mockResolvedValue(existingRecords);

      const energyBills: EnergyBillPayload[] = [/* Insert test data here */];

      await ingestEnergyBill.execute(energyBills);

      // Assert that no new energy bills were saved
      expect(timeRepoMock.save).not.toHaveBeenCalled();
      // Add assertions to verify no bills were saved
    });
  });
});
