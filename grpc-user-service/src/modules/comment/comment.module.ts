import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '@/modules/comment/comment.controller';
import { CommentsService } from '@/modules/comment/comment.service';
import { Comment } from '@/modules/comment/comment.entity';
import { User } from '@/modules/user/user.entity';
import { Post } from '@/modules/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,User,Post])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
