import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '@/modules/post/post.entity';
import { CreatePostDto } from '@/modules/post/dto/create-post-dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({where:{id:id}});

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(post: CreatePostDto): Promise<Post> {
    return this.postRepository.save(post);
  }
}
