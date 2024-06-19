import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    @ApiProperty({ example: 'My Post Title' })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    @ApiProperty({ example: 'My Post Content' })
    @IsNotEmpty({ message: 'Content cannot be empty' })
    content: string;
}
