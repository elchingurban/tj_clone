import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  text: string;
}
