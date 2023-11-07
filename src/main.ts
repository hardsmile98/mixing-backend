import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const URL_CLIENT = configService.get<string>('URL_CLIENT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: URL_CLIENT,
    methods: '*',
    credentials: true,
  });

  await app.listen(8080);
}

bootstrap();
