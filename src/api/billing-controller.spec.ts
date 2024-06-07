import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as path from 'path';
import { AppModule } from '../../src/app.module';
import { join } from 'path';
import * as fs from 'fs';
import { mkdirSync, rmdirSync } from 'fs';
import { after } from 'node:test';

describe('BillingController (e2e)', () => {
  let app: INestApplication;
  const testFolderPath = join(__dirname, '..', 'src', 'files');

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Cria o diretório de teste se não existir
    if (!fs.existsSync(testFolderPath)) {
      mkdirSync(testFolderPath,{recursive: true});
    }
  });

  afterAll(async () => {
    await app.close();

    // Remove o diretório de teste após os testes
    if (fs.existsSync(testFolderPath)) {
      rmdirSync(testFolderPath, { recursive: true });
    }
  });

  it('/billing/upload (POST) - should upload CSV files and process data', async () => {
    const filePath = path.join(__dirname, 'test.csv');

    const response = await request(app.getHttpServer())
      .post('/billing/upload')
      .attach('files', filePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Todos os arquivos foram processados com sucesso.',
    );

    // Verifica se o arquivo foi salvo no diretório correto
    const savedFilePath = path.join(testFolderPath, 'sample.csv');
    expect(fs.existsSync(savedFilePath)).toBe(true);
  });
});
