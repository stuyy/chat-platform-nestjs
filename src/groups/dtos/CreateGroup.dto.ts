import { ArrayNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString({ each: true })
  @ArrayNotEmpty()
  users: string[];

  title: string;
}
