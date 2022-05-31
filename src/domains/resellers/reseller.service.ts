import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResellerDto } from './dto/create-reseller.dto';
import { Reseller } from './entities/resellers.entity';
import { cpf } from 'cpf-cnpj-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResellerService {
  constructor(
    @InjectRepository(Reseller)
    private readonly resellerRepository: Repository<Reseller>,
  ) {}

  async create(createResellerDto: CreateResellerDto) {
    const user = this.resellerRepository.create({
      ...createResellerDto,
      password: await bcrypt.hash(createResellerDto.password, 10),
    });

    const emailExists = await this.resellerRepository.findOne({
      email: createResellerDto.email,
    });

    if (emailExists) {
      throw new HttpException('E-mail já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const isValid = cpf.isValid(createResellerDto.cpf);

    if (isValid === false) {
      throw new HttpException('CPF inválido.', HttpStatus.BAD_REQUEST);
    }

    this.resellerRepository.save(user);

    return { ...user, password: undefined };
  }

  async findAll() {
    return this.resellerRepository.find();
  }

  findByEmail(email: string) {
    return this.resellerRepository.findOne({ email });
  }
}
