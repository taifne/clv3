import { GetPostRequest, ListPostsRequest, ListPostsResponse } from '@/proto/post/post';
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { Post as PostEntity } from '@/modules/post/post.entity';
import { PostService } from '@/modules/post/post.service';
import { CreatePostDto } from '@/modules/post/dto/create-post-dto';
import { CreatePostRequest, CreatePostResponse, GetPostResponse, PostServiceController, PostServiceControllerMethods } from '@/proto/post/post';

@Controller('posts')
@PostServiceControllerMethods()
export class PostController implements PostServiceController {
  constructor(private readonly postService: PostService) { }

  async createPost(postData: CreatePostRequest): Promise<CreatePostResponse> {
    return { post: await this.postService.create(postData) };
  }

  @Get(':id')
  async getPost(getpostdata:GetPostRequest): Promise<GetPostResponse> {
    const post = await this.postService.findById(getpostdata.id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${getpostdata.id} not found`);
    }
    return {post};
  }


  async listPosts(data:ListPostsRequest): Promise<ListPostsResponse> {
    return {posts:await this.postService.findAll()};
  }
}
