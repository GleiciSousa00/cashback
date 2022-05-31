import { Module } from '@nestjs/common';
import { ResellerService } from './reseller.service';
import { ResellerController } from './reseller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reseller } from './entities/resellers.entity';

@Module({
  controllers: [ResellerController],
  providers: [ResellerService],
  imports: [TypeOrmModule.forFeature([Reseller])],
  exports: [ResellerService],
})
export class ResellerModule {}
