import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  intanceSwagger(app);
  app.enableCors({
    origin: [
      'https://quarks-team.github.io', // Frontend in production
      'http://localhost:5173', // Frontend excuted locallly
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  await app.listen(3000);
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
