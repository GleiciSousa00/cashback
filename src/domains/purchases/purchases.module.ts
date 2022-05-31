import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchases.entity';
import { Reseller } from '../resellers/entities/resellers.entity';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [TypeOrmModule.forFeature([Purchase, Reseller])],
  exports: [PurchasesService],
})
export class PurchasesModule {}
