import { Comment } from './comment.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from '@/modules/comment/comment.controller';
import { CommentsService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dto/create-comment.dto';
import { UpdateCommentDto } from '@/modules/comment/dto/update-comment.dto';
import { HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

describe('CommentsController', () => {
    let controller: CommentsController;
    let service: CommentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentsController],
            providers: [
                {
                    provide: CommentsService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        getCommentsForPost: jest.fn(),
                        updateComment: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CommentsController>(CommentsController);
        service = module.get<CommentsService>(CommentsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a comment', async () => {
            const createCommentDto: CreateCommentDto = {
                content: "Absolutely! We're stronger when we work together.",
                parentId: null,
                postId: 2,
                userId: 7
            };
            const createdComment = {
                content: "Absolutely! We're stronger when we work together.hahaha",
                post: {
                    id: 2,
                    comments:[],
                title: "Breakthrough in Renewable Energy Research",
                    content: "Researchers have announced a major breakthrough in the field of renewable energy, paving the way for more efficient and sustainable power sources.",
                    createdAt: new Date("2024-04-21T20:20:28.593Z")
                },
                user: {
                    id: 10,
                    username: "EmmaWilson",
                    email: "emmawilson@email.com",
                    createdAt: new Date("2024-04-23T20:50:26.896Z"),
                    comments:[]
                },
                parentId: null,
                id: 117,
                createdAt:new Date("2024-05-01T20:49:40.351Z"),
                deletedAt: null,
                replies:[],
                likes:[]
            };

            jest.spyOn(service, 'create').mockResolvedValue(createdComment);

            expect(await controller.create(createCommentDto)).toBe(createdComment);
            expect(service.create).toHaveBeenCalledWith(createCommentDto);
        });
    });



    describe('findAll', () => {
        it('should return comments with status code 200', async () => {
            const page = 1;
            const limit = 20;
            const sortBy = 'createdAt';
            const sortOrder = 'DSC';
            const filter = null;

            const expectedResult = {
                comments: [{
                    content: "Absolutely! We're stronger when we work together.hahaha",
                    post: {
                        id: 2,
                        comments: [],
                        title: "Breakthrough in Renewable Energy Research",
                        content: "Researchers have announced a major breakthrough in the field of renewable energy, paving the way for more efficient and sustainable power sources.",
                        createdAt: new Date("2024-04-21T20:20:28.593Z")
                    },
                    user: {
                        id: 10,
                        username: "EmmaWilson",
                        email: "emmawilson@email.com",
                        createdAt: new Date("2024-04-23T20:50:26.896Z"),
                        comments: []
                    },
                    parentId: null,
                    id: 117,
                    createdAt: new Date("2024-05-01T20:49:40.351Z"),
                    deletedAt: null,
                    replies: [],
                    likes: []
                }
                ],
                total: 32,
            };


            jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

            const result = await controller.findAll({ page, limit, sortBy, sortOrder, filter });

            expect(result).toEqual(expectedResult);
            expect(service.findAll).toHaveBeenCalledWith(page, limit, sortBy, sortOrder, filter);
        });
    });
});
