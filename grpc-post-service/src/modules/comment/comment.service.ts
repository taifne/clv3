import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@/modules/comment/comment.entity';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/modules/comment/dto/update-comment.dto';
import { Post } from '@/modules/post/post.entity';
import { User } from '@/modules/user/user.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { postId, userId, parentId, ...commentData } = createCommentDto;
    const post = await this.findOneOrFail(this.postRepository, postId, 'Post');
    const user = await this.findOneOrFail(this.userRepository, userId, 'User');
    const parentComment = parentId !== null ? await this.findOneOrFail(this.commentRepository, parentId, 'Comment') : null;
    const newComment = this.commentRepository.create({
      ...commentData,
      parentId: parentComment?.id ?? null,
      post,
      user,
    });
    return await this.commentRepository.save(newComment);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    filter: any = {},
  ): Promise<{ comments: Comment[]; total: number }> {

    if (page <= 0 || limit <= 0) {
      throw new BadRequestException('Invalid pagination parameters');
    }
    const allowedSortFields = ['createdAt', 'updatedAt'];
    if (!allowedSortFields.includes(sortBy)) {
      throw new BadRequestException('Invalid sortBy parameter');
    }

    const skip = (page - 1) * limit;

    try {
      const [comments, total] = await this.commentRepository.findAndCount({
        where: { ...filter, deletedAt: null },
        relations: ['post', 'user'],
        order: { [sortBy]: sortOrder },
        take: limit,
        skip,
      });

      if (comments.length === 0) {
        throw new NotFoundException('No comments found');
      }

      return { comments, total };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comments');
    }
  }


  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.likes', 'likes')
      .select([
        'comment.id',
        'comment.content',
        'user.username',
        'likes.id',
        'likes.username'
      ])
      .where('comment.id = :id', { id })
      .andWhere('comment.deletedAt IS NULL')
      .getOne();

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
  async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    let commentToUpdate = await this.commentRepository.findOne({ where: { id: id }, relations: ['likes'] });

    if (!commentToUpdate) {
      throw new NotFoundException('Comment not found');
    }

    if (updateCommentDto.likes !== undefined) {
      const usersToLike = updateCommentDto.likes.map(userId => {
        const user = new User();
        user.id = userId;
        return user;
      });

      commentToUpdate.likes = usersToLike;
    }


    if (updateCommentDto.content !== undefined) {
      commentToUpdate.content = updateCommentDto.content;
    }

    if (updateCommentDto.parentId !== undefined) {
      commentToUpdate.parentId = updateCommentDto.parentId;
    }

    const updatedComment = await this.commentRepository.save(commentToUpdate);

    return updatedComment;
  }

  async remove(id: number, softDelete: boolean = true): Promise<void> {
    const comment = await this.findOneOrFail(this.commentRepository, id, 'Comment');

    if (softDelete) {
      comment.deletedAt = new Date();
      await this.commentRepository.save(comment);
    } else {
      await this.commentRepository.delete(id);
    }
  }

  async getCommentsForPost(postId: number): Promise<Comment[]> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.user', 'user')
      .leftJoin('comment.likes', 'likes')
      .leftJoin('comment.post', 'post')
      .select([
        'comment.id',
        'comment.content',
        'comment.createdAt',
        'comment.parentId',
        'user.username',
        'user.email',
        'user.id',
        'likes.id',
        'likes.username'
      ])
      .where('comment.post = :postId', { postId })
      .andWhere('comment.deletedAt IS NULL')
      .getMany();


    return this.buildCommentTree(comment);
  }

  private buildCommentTree(comments: Comment[]): Comment[] {
    const commentMap = new Map<number, Comment>();
    const rootComments: Comment[] = [];

    comments.forEach(comment => {
      comment.replies = [];
      commentMap.set(comment.id, comment);
      if (!comment.parentId) {
        rootComments.push(comment);
      }
    });

    comments.forEach(comment => {
      if (comment.parentId) {
        const parentComment = commentMap.get(comment.parentId);
        if (parentComment) {
          parentComment.replies.push(comment);
        }
      }
    });

    return rootComments;
  }

  private async findOneOrFail(repository: Repository<any>, id: number, entity: string): Promise<any> {
    const result = await repository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException(`${entity} with ID ${id} not found`);
    }
    return result;
  }
}