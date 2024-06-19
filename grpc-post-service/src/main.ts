import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERSERVICE_PACKAGE_NAME } from './proto/user/user';
import { POSTSERVICE_PACKAGE_NAME } from './proto/post/post';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50053',
      package: POSTSERVICE_PACKAGE_NAME,
      protoPath: join(__dirname, '../proto/post/post.proto'),
    },
  };
  app.connectMicroservice(grpcOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
