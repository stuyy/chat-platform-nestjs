import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  username: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  firstName: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  lastName: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
