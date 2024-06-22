import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  intanceSwagger(app);
  app.enableCors({
    origin: [
      'https://quarks-team.github.io',
      'http://localhost:5173/projeto_integrador_tecsus_frontend/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  const port = process.env.PORT || 3000;
  console.log(`Listening on port ${port}...`);
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
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
