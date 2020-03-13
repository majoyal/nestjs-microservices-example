import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientProxyFactory } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'WORKER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const sdkServicePort = configService.get('WORKER_MICROSERVICE_PORT');
        const sdkServiceHost = configService.get('WORKER_MICROSERVICE_HOST');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: sdkServicePort,
            host: sdkServiceHost,
          }
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
