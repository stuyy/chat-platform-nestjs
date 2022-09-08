import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
