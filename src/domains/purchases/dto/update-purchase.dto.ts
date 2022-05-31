import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusEnum } from '../enum/status.enum';
import { CreatePurchaseDto } from './create-purchase.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
  @ApiProperty()
  value: number;

  @ApiProperty()
  cpf_revendedor: string;

  @ApiProperty()
  status: StatusEnum;
}
