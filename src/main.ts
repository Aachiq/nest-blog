import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add cors
  app.enableCors({
    origin: `http://localhost:3001`,
    methods: ['POST', 'GET'],
    credentials: true, // this used to enable use 'Authorization ...'
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
