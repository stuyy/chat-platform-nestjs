import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
