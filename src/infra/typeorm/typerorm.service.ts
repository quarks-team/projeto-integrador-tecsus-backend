import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    console.log('AQUIIII', this.configService.get('db'));
    return {
      type: 'mongodb',
      url: this.configService.get('db'),
      database: 'billing-ingestion-service',
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      autoLoadEntities: true,
      useUnifiedTopology: true,
      synchronize: true,
      useNewUrlParser: false,
      logging: true,
    };
  }
}
