import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '@/modules/comment/comment.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from '@/modules/comment/comment.entity';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Post } from '@/modules/post/post.entity';
import { User } from '@/modules/user/user.entity';
import { create } from 'domain';
import { UpdateCommentDto } from './dto/update-comment.dto';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentRepository: Repository<Comment>;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(),
            delete: jest.fn(),
            findAndCount: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Post),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          }
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });


  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  it('user Repository should be defined', () => {
    expect(userRepository).toBeDefined();
  })
  describe('findOne', () => {
    it('should find and return a comment by ID', async () => {
      const commentId = 1;
      const mockComment: Comment = {
        id: commentId,
        content: 'Test comment',
        user: { id: 1, username: 'test_user', email: 'test@example.com', comments: [], createdAt: new Date() },
        post: { id: 1, title: 'Test post', content: 'Test content', comments: [], createdAt: new Date() },
        replies: [],
        parentId: null,
        likes: [],
        createdAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockComment),
      } as any);

      const result = await commentsService.findOne(commentId);


      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException if comment is not found', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(undefined),
      } as any);

      await expect(commentsService.findOne(commentId)).rejects.toThrow(NotFoundException);
    });
  });
  describe('remove', () => {
    it('should soft delete a comment if softDelete is true', async () => {

      const commentId = 1;
      const mockComment: Comment = {
        id: commentId,
        content: 'Test comment',
        user: { id: 1, username: 'test_user', email: 'test@example.com', comments: [], createdAt: new Date() },
        post: { id: 1, title: 'Test post', content: 'Test content', comments: [], createdAt: new Date() },
        replies: [],
        parentId: null,
        likes: [],
        createdAt: new Date(),
        deletedAt: null,
      };

      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(mockComment);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(mockComment);



      await commentsService.remove(commentId, true);


      expect(mockComment.deletedAt).not.toBeNull();
    });

    it('should delete a comment permanently if softDelete is false', async () => {
      const commentId = 1;
      const mockComment: Comment = {
        id: commentId,
        content: 'Test comment',
        user: { id: 1, username: 'test_user', email: 'test@example.com', comments: [], createdAt: new Date() },
        post: { id: 1, title: 'Test post', content: 'Test content', comments: [], createdAt: new Date() },
        replies: [],
        parentId: null,
        likes: [],
        createdAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(mockComment);

      jest.spyOn(commentRepository, 'delete').mockResolvedValue({} as any);


      await commentsService.remove(commentId, false);


      expect(commentRepository.delete).toHaveBeenCalledWith(commentId);
    });

    it('should throw NotFoundException if comment is not found', async () => {

      const commentId = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(null);


      await expect(commentsService.remove(commentId)).rejects.toThrow(NotFoundException);
    });
  });
  describe('findAll', () => {
    it('should return comments with valid pagination parameters', async () => {
      // Arrange
      const mockComments: Comment[] = [
        {
          id: 1,
          content: 'Test comment 1',
          createdAt: new Date(),
          user: null,
          post: null,
          parentId: null,
          replies: [],
          likes: [],
          deletedAt: null,
        },
      ];
      jest.spyOn(commentRepository, 'findAndCount').mockResolvedValueOnce([mockComments, mockComments.length]);

      const result = await commentsService.findAll(1, 10, 'createdAt', 'DESC', {});

      expect(result.comments).toEqual(mockComments);
      expect(result.total).toEqual(mockComments.length);
    });

    it('should throw BadRequestException with invalid pagination parameters', async () => {

      await expect(async () => {
        await commentsService.findAll(0, 10, 'createdAt', 'DESC', {});
      }).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException with invalid sortBy parameter', async () => {

      await expect(async () => {
        await commentsService.findAll(1, 10, 'invalidField', 'DESC', {});
      }).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException when no comments found', async () => {
      jest.spyOn(commentRepository, 'findAndCount').mockResolvedValueOnce([[], 0]);

      await expect(async () => {
        let comment = await commentsService.findAll(1, 10, 'createdAt', 'DESC', {});
        console.log(comment);
        await commentsService.findAll(1, 10, 'createdAt', 'DESC', {});
      }).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException on failure to fetch comments', async () => {
      jest.spyOn(commentRepository, 'findAndCount').mockRejectedValueOnce(new Error('Database connection error'));

      await expect(async () => {
        await commentsService.findAll(1, 10, 'createdAt', 'DESC', {});
      }).rejects.toThrow(InternalServerErrorException);
    });
  });


  it('should update a comment', async () => {

    const commentId = 1;
    const updateCommentDto: UpdateCommentDto = {
      content: 'Updated content',
      parentId: 2,
      likes: [1, 2, 3],
    };
    const existingComment = new Comment();
    existingComment.id = commentId;
    existingComment.content = 'Original content';
    existingComment.likes = [];


    commentRepository.findOne = jest.fn().mockResolvedValue(existingComment);
    commentRepository.save = jest.fn().mockResolvedValue(existingComment);
    await commentsService.updateComment(commentId, updateCommentDto);
    expect(commentRepository.findOne).toHaveBeenCalledWith({ where: { id: commentId }, relations: ['likes'] });
    expect(existingComment.content).toBe(updateCommentDto.content);
    expect(existingComment.parentId).toBe(updateCommentDto.parentId);
    expect(existingComment.likes.length).toBe(updateCommentDto.likes.length);
    expect(commentRepository.save).toHaveBeenCalledWith(existingComment);
  });

  it('should throw an error if comment not found', async () => {
    commentRepository.findOne = jest.fn().mockResolvedValue(undefined);
    await expect(commentsService.updateComment(999, {} as UpdateCommentDto)).rejects.toThrow('Comment not found');


    expect(commentRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 }, relations: ['likes'] });
  });
});
