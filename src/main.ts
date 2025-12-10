import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      enableDebugMessages: true,
    }),
  );

  app.enableCors({
    origin: [
      'https://happyfly.site',
      'https://www.happyfly.site',
      'https://happy-fly-omega.vercel.app',
      'http://localhost:3000',
      'https://localhost:3000'
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(4000);
  console.log("🚀 Backend corriendo en http://localhost:4000");
}
bootstrap();
