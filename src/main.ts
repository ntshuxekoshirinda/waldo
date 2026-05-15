import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // This tells Nest to automatically validate every request 
  // based on the rules we set in our DTOs (Data Transfer Objects).
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips out any data that isn't explicitly defined
    forbidNonWhitelisted: true, // Throws an error if extra data is sent
    transform: true, // Automatically converts types (e.g., string "5" to number 5)
  }));

  // Enable CORS so your Render frontend can talk to this backend
  app.enableCors();

  await app.listen(3000);
}
bootstrap();