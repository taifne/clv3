import { Controller } from '@nestjs/common';
import { CommentsService } from '@/modules/comment/comment.service';
import { CommentListResponse, CommentResponse, CommentsServiceController, CommentsServiceControllerMethods, CreateCommentRequest, FindAllCommentsRequest, FindCommentsByPostIdRequest, FindOneCommentRequest, RemoveCommentRequest, UpdateCommentRequest, RemoveCommentResponse } from './proto/comment';

@Controller('comments')
@CommentsServiceControllerMethods()
export class CommentsController implements CommentsServiceController {
  constructor(private readonly commentsService: CommentsService) { }

  async createComment(createCommentData: CreateCommentRequest): Promise<CommentResponse> {
    return { comment: await this.commentsService.create(createCommentData) };
  }
  async findAllComments(findAllData: FindAllCommentsRequest): Promise<CommentListResponse> {
    const { page, limit, sortBy, sortOrder, filter } = findAllData;
    const comments = await this.commentsService.findAll(page, limit, sortBy, sortOrder, filter);
    return comments;
  }

  async findOneComment(findOneData: FindOneCommentRequest): Promise<CommentResponse> {
    return { comment: await this.commentsService.findOne(findOneData.id) };
  }

  async findCommentsByPostId(findCommentData: FindCommentsByPostIdRequest): Promise<CommentListResponse >{
    return { comments: await this.commentsService.getCommentsForPost(findCommentData.postId) }
  }


  async updateComment(updateCommentData: UpdateCommentRequest): Promise<CommentResponse> {
    return { comment: await this.commentsService.updateComment(updateCommentData.id, updateCommentData) };
  }

  async removeComment(removeCommentData:RemoveCommentRequest):Promise<RemoveCommentResponse> {
    await this.commentsService.remove(removeCommentData.id);

    return { message: 'Comment deleted ' };
  }
}
