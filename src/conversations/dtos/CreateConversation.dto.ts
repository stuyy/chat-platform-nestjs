import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
