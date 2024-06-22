import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from '../../src/api/billing.controller';
import { BillingService } from '../../src/domain/service/billing.service';

describe('BillingController', () => {
  let billingController: BillingController;
  let billingService: BillingService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [
        {
          provide: BillingService,
          useValue: {
            transform: jest
              .fn()
              .mockResolvedValue('billing-ingestion: hmm good ingestion'),
          },
        },
      ],
    }).compile();

    billingController = app.get<BillingController>(BillingController);
    billingService = app.get<BillingService>(BillingService);
  });

  describe('uploadFiles', () => {
    it('should process the uploaded files', async () => {
      const files = [
        {
          originalname: 'test.csv',
          buffer: Buffer.from('content'),
        } as Express.Multer.File,
      ];
      await expect(billingController.uploadFiles(files)).resolves.toEqual({
        message: 'Todos os arquivos foram processados com sucesso.',
      });
    });
  });

  describe('sse', () => {
    it('should set SSE headers', () => {
      const res = {
        setHeader: jest.fn(),
        flushHeaders: jest.fn(),
        sendStatus: jest.fn(),
        links: jest.fn(),
        send: jest.fn(),
        jsonp: jest.fn(),
      } as unknown as any;
      billingController.sse(res);
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'text/event-stream',
      );
      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      expect(res.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
      expect(res.flushHeaders).toHaveBeenCalled();
    });
  });
});
