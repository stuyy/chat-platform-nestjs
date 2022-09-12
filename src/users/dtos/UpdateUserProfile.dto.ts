import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  about?: string;
}
