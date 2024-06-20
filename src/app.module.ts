import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './infra/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './infra/typeorm/typerorm.service';
import { TypeormModule } from './infra/typeorm/typeorm.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    TypeormModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
