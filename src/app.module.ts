import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './infra/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './infra/typeorm/typeorm.service';
import { TypeormModule } from './infra/typeorm/typeorm.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    TypeormModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
