import { Controller, Get, Param } from '@nestjs/common';
import { CachbackService } from './cachback.service';

@Controller('cachback')
export class CachbackController {
  constructor(private readonly cachbackService: CachbackService) {}

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.cachbackService.findOne(cpf);
  }
}
