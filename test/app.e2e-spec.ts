import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/upload (POST)', async () => {
    return request(app.getHttpServer())
      .post('/billing/upload')
      .attach('files', path.resolve(__dirname, './test_files/con_agua.csv'))
      .expect(201)
      .expect({
        message: 'Todos os arquivos foram processados com sucesso.',
      });
  }, 500000);
});
