import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { GlobalExceptionsFilter } from './shared/exceptions/error.exception';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
config();
async function bootstrap() {
  const { PORT, IP_ADDRESS } = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(PORT, IP_ADDRESS);
}
bootstrap();
