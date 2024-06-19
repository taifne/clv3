import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '@/modules/comment/comment.controller';
import { CommentsService } from '@/modules/comment/comment.service';
import { Comment } from '@/modules/comment/comment.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERSERVICE_PACKAGE_NAME } from '@/proto/user/user';
import { join } from 'path';
import { POSTSERVICE_PACKAGE_NAME } from '@/proto/post/post';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]),
  ClientsModule.register([
    {
      name: USERSERVICE_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: USERSERVICE_PACKAGE_NAME,
        protoPath: join(__dirname, '../../../proto/user/user.proto'),
        url: 'localhost:50051',
      },
    },
    {
      name: POSTSERVICE_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: POSTSERVICE_PACKAGE_NAME,
        protoPath: join(__dirname, '../../../proto/post/post.proto'),
        url: 'localhost:50053',
      }
    }
  ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
