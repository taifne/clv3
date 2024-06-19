import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERSERVICE_PACKAGE_NAME } from './proto/user';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: USERSERVICE_PACKAGE_NAME,
      protoPath: join(__dirname, '../proto/user.proto'),
    },
  };

  console.log(join(__dirname, '/modules/user/proto/user.proto'))
  app.connectMicroservice(grpcOptions);

  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
