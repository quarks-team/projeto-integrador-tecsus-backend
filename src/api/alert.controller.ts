import { Controller, Get } from '@nestjs/common';
import { AlertService } from 'src/domain/service/alert.service';

@Controller('alerts')
export class AlertController {
  constructor(private readonly service: AlertService) {}

  @Get('')
  async getAll() {
    return await this.service.getAll();
  }
}
