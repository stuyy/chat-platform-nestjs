import { IsString, MaxLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @MaxLength(200)
  about?: string;
}
