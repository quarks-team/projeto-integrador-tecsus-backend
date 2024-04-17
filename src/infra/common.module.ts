import { Global, Module } from '@nestjs/common';
import configModule from './config/config.module';
import { TypeormService } from './typeorm/typerorm.service';
import { TypeormModule } from './typeorm/typeorm.module';

@Global()
@Module({
  imports: [configModule],
  controllers: [],
  providers: [],
  exports: [configModule],
})
export class CommonModule {}
