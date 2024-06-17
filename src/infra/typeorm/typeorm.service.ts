import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port:
        parseInt(this.configService.get<string>('DATABASE_PORT'), 10) || 3306,
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    };
  }
}
