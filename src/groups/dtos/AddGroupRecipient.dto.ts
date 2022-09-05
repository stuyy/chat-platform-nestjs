import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddGroupRecipientDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
