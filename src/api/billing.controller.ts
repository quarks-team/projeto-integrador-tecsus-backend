import { Controller, Get, Query } from '@nestjs/common';
import { BillingService } from 'src/domain/service/billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly service: BillingService) {}

  @Get()
  async putFile(@Query('path') path: string): Promise<string> {
    console.log(path);
    return await this.service.transform(path);
  }
}
