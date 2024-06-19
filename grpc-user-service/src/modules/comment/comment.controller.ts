import { Controller, Get, Post, Body, Param, Patch, Delete, UseInterceptors, HttpCode, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { CommentsService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/modules/comment/dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() queryString: any) { 
    const { page, limit, sortBy, sortOrder, filter } = queryString;
    const comments = await this.commentsService.findAll(page, limit, sortBy, sortOrder, filter);
    return comments;
  }
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: string) {
    return await this.commentsService.findOne(+id);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/post/:id')
  async findOneByPostId(@Param('id',ParseIntPipe) id: string) {
    return await this.commentsService.getCommentsForPost(+id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.updateComment(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: string) {
    await this.commentsService.remove(+id);

    return { message: 'Comment deleted ' };
  }
}
