import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchases.entity';
import { addDays } from 'date-fns';
import { StatusEnum } from './enum/status.enum';
import { Reseller } from '../resellers/entities/resellers.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Reseller)
    private readonly resellerRepository: Repository<Reseller>,
  ) {}

  create(createPurchaseDto: CreatePurchaseDto) {
    const purchases = this.purchaseRepository.create(createPurchaseDto);

    if (purchases.value <= 1000) {
      purchases.cashback_value = purchases.value * 0.1;
      purchases.cashback_percentage = 10;
    } else if (purchases.value > 1000 && purchases.value <= 1500) {
      purchases.cashback_value = purchases.value * 0.15;
      purchases.cashback_percentage = 15;
    } else {
      purchases.cashback_value = purchases.value * 0.2;
      purchases.cashback_percentage = 20;
    }

    if (
      purchases.cpf_reseller === '15350946056' ||
      purchases.cpf_reseller === '153.509.460-56'
    ) {
      purchases.status = StatusEnum.APPROVED;
    } else {
      purchases.status = StatusEnum.IN_VALIDATION;
    }

    purchases.code = Math.floor(100000 + Math.random() * 900000).toString();

    purchases.receivement_cashback = addDays(new Date(), 30);

    return this.purchaseRepository.save(purchases);
  }

  async findAll() {
    const query = this.purchaseRepository.createQueryBuilder('purchases');

    return query.orderBy('purchases.id', 'DESC').getManyAndCount();
  }
}
