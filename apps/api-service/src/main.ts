import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const conf = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: conf.get('INSPECT_MICROSERVICE_PORT'),
      retryAttempts: 5,
      retryDelay: 3000,
    }
  });
  
  await app.startAllMicroservicesAsync();

  await app.listen(3000);

  console.log('Microservice is listening');
}
bootstrap();
