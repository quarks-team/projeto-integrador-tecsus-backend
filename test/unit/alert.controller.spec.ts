import { Test, TestingModule } from '@nestjs/testing';
import { AlertController } from '../../src/api/alert.controller';
import { AlertService } from '../../src/domain/service/alert.service';

describe('AlertController', () => {
  let alertController: AlertController;
  let alertService: AlertService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AlertController],
      providers: [
        {
          provide: AlertService,
          useValue: {
            getAll: jest.fn().mockResolvedValue({
              watter: [],
              wastepipe: [],
            }),
          },
        },
      ],
    }).compile();

    alertController = app.get<AlertController>(AlertController);
    alertService = app.get<AlertService>(AlertService);
  });

  describe('getAll', () => {
    it('should return all alerts', async () => {
      await expect(alertController.getAll()).resolves.toEqual({
        watter: [],
        wastepipe: [],
      });
    });
  });
});
