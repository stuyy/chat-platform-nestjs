import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  recipientId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
