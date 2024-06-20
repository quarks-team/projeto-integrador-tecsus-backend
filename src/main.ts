import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('Starting application...');
  const app = await NestFactory.create(AppModule);
  console.log('Application created, setting up Swagger...');
  intanceSwagger(app);
  console.log('Swagger set up, enabling CORS...');
  app.enableCors({
    origin: ['https://quarks-team.github.io', 'http://localhost:5173/projeto_integrador_tecsus_frontend/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
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
    deepScanRoutes: true
  });
  SwaggerModule.setup('api', app, privateDocument);
}