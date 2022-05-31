import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty()
  value: number;

  @ApiProperty()
  cpf_reseller: string;
}
