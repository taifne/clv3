import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { Post as PostEntity } from '@/modules/post/post.entity';
import { PostService } from '@/modules/post/post.service';
import { CreatePostDto } from '@/modules/post/dto/create-post-dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  @Post()
  async create(@Body() post: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(post);
  }
}
