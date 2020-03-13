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
      provide: 'API_SERVICE',
      useFactory: (configService: ConfigService) => {
        const inspectServicePort = configService.get('INSPECT_MICROSERVICE_PORT');
        const inspectServiceHost = configService.get('INSPECT_MICROSERVICE_HOST');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: inspectServicePort,
            host: inspectServiceHost,
          }
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class AppModule {}
