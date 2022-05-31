import { PartialType } from '@nestjs/mapped-types';
import { CreateResellerDto } from './create-reseller.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateResellerDto extends PartialType(CreateResellerDto) {
  @ApiProperty({
    description: 'E-mail do usuário',
    required: true,
    example: 'email@email.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  phone2: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@-_#\$%\^&\*])(?=.{8,})/)
  password: string;
}
