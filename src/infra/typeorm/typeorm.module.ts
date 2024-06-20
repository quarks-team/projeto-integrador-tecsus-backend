import { Module } from '@nestjs/common';
import { TypeormService } from './typerorm.service';

@Module({
  providers: [TypeormService],
})
export class TypeormModule {}
