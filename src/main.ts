import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  intanceSwagger(app);
  console.log(process.env);
  app.enableCors({
    origin: 'http://localhost:5173', // Permission just for the frontend port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(process.env.PORT);
}
bootstrap();

function intanceSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Quarks - Billing ingestion service')
    .setDescription('API externa para consumo e transformação de contas')
    .setVersion(process.env.npm_package_version as string)
    .build();
  const privateDocument = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, privateDocument);
}
