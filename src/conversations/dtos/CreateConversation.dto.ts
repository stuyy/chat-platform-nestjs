import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
