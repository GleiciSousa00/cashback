import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResellerService } from './reseller.service';
import { CreateResellerDto } from './dto/create-reseller.dto';

import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('reseller')
@ApiTags('Reselles')
export class ResellerController {
  constructor(private readonly resellerService: ResellerService) {}

  @IsPublic()
  @Post()
  create(@Body() createResellerDto: CreateResellerDto) {
    return this.resellerService.create(createResellerDto);
  }

  @Get()
  findAll() {
    return this.resellerService.findAll();
  }
}
