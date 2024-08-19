import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',  
    allowedHeaders: [
      '*',
      /* 'Content-Type, Access-Control-Allow-Origin, x-access-token, Accept', */
    ],
    methods: 'POST,GET,PUT,PATCH,DELETE',
  });
  await app.listen(3000);
}
bootstrap();
