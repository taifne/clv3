import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a great article!' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: null, required: false })
  @IsOptional()
  @IsNumber()
  parentId?: number;

  @ApiProperty({ example: 123 })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({ example: 456 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
