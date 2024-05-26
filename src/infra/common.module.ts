import { Global, Module } from '@nestjs/common';
import configModule from './config/config.module';

@Global()
@Module({
  imports: [configModule],
  controllers: [],
  providers: [],
  exports: [configModule],
})
export class CommonModule {}
