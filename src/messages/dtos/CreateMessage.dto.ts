import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  content: string;
}
