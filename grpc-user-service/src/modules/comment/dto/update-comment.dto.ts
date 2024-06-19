// update-comment.dto.ts
import { IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  likes?: number[];

  @IsOptional()
  parentId?: number;

}
