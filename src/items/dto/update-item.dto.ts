import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateItemDto {
  @ApiProperty()
  public: boolean;

  @ApiProperty()
  comments: CreateCommentDto[];
}
