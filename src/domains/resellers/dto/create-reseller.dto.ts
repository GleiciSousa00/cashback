import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateResellerDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    required: true,
    example: 'email@email.com',
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty()
  @IsOptional()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  phone2: string;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@-_#\$%\^&\*])(?=.{8,})/, {
    message: 'Senha inválida',
  })
  password: string;
}
