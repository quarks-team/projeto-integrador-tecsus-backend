import { Test, TestingModule } from '@nestjs/testing';
import { IngestWatterBill } from './IngestWatterBill';
import { Repository } from 'typeorm';
import { Time } from '../entity/time.entity';
import { WatterBill } from '../entity/watter-bill.entity';
import { WatterBillPayload } from '../request/watter-bill-payload';

describe('IngestWatterBill', () => {
  let ingestWatterBill: IngestWatterBill;
  let timeRepoMock: Repository<Time>;
  let billRepoMock: Repository<WatterBill>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        IngestWatterBill,
        {
          provide: 'TimeRepository', // Provide a token for the Time repository
          useClass: Repository, // Use a mock class for Repository
        },
        {
          provide: 'WatterBillRepository', // Provide a token for the WatterBill repository
          useClass: Repository, // Use a mock class for Repository
        },
      ],
    }).compile();

    ingestWatterBill = moduleFixture.get<IngestWatterBill>(IngestWatterBill);
    timeRepoMock = moduleFixture.get<Repository<Time>>('TimeRepository');
    billRepoMock = moduleFixture.get<Repository<WatterBill>>('WatterBillRepository');
  });

  describe('execute', () => {
    it('should insert all water bills when the database is empty', async () => {
      // Mock timeRepo to return an empty array
      timeRepoMock.find = jest.fn().mockResolvedValue([]);

      const waterBills: WatterBillPayload[] = [/* Insert test data here */];

      await ingestWatterBill.execute(waterBills);

      // Assert that all water bills were saved
      expect(timeRepoMock.save).toHaveBeenCalledWith(/* Expected times array */);
      // Add more assertions as needed
    });

    it('should insert only new water bills when some already exist in the database', async () => {
      // Mock timeRepo to return some existing records
      const existingRecords: Partial<Time>[] = [/* Insert existing records here */];
      timeRepoMock.find = jest.fn().mockResolvedValue(existingRecords);

      const waterBills: WatterBillPayload[] = [/* Insert test data here */];

      await ingestWatterBill.execute(waterBills);

      // Assert that only new water bills were saved
      expect(timeRepoMock.save).toHaveBeenCalledWith(/* Expected times array */);
      // Add assertions to verify only new bills were saved
    });

    it('should not insert any water bills when all already exist in the database', async () => {
      // Mock timeRepo to return all existing records
      const existingRecords: Partial<Time>[] = [/* Insert existing records here */];
      timeRepoMock.find = jest.fn().mockResolvedValue(existingRecords);

      const waterBills: WatterBillPayload[] = [/* Insert test data here */];

      await ingestWatterBill.execute(waterBills);

      // Assert that no new water bills were saved
      expect(timeRepoMock.save).not.toHaveBeenCalled();
      // Add assertions to verify no bills were saved
    });
  });
});
