import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransferOwnerDto {
  @IsNotEmpty()
  @IsNumber()
  newOwnerId: number;
}
