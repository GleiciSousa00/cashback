import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../enum/status.enum';

@Entity({ name: 'purchases' })
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  value: number;

  @ApiProperty()
  @CreateDateColumn()
  date: Date;

  @ApiProperty()
  @Column()
  cpf_reseller: string;

  @ApiProperty()
  @Column({ default: StatusEnum.IN_VALIDATION })
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @ApiProperty()
  @Column()
  receivement_cashback: Date;

  @ApiProperty()
  @Column()
  cashback_percentage: number;

  @ApiProperty()
  @Column()
  cashback_value: number;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
