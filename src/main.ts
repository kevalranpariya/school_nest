import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();
async function bootstrap() {
  const { PORT, IP_ADDRESS } = process.env;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, IP_ADDRESS);
}
bootstrap();
