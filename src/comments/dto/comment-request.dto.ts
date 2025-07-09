import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string; // this names should be written with the same way of database

  @IsNotEmpty()
  //   id_user: number; // don't use this because name should be same as entity relation
  user: number;

  @IsNotEmpty()
  post: number;
}
