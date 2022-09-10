import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(18)
  username: string;

  @IsString()
  @MaxLength(200)
  about?: string;
}
