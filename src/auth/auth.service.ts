import { Injectable } from '@nestjs/common';
import { ResellerService } from 'src/domains/resellers/reseller.service';
import * as bcrypt from 'bcrypt';
import { Reseller } from 'src/domains/resellers/entities/resellers.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly resellerService: ResellerService,
  ) {}

  login(user: Reseller): UserToken {
    const payload: UserPayload = {
      sub: user.cpf,
      email: user.email,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.resellerService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Usuário ou senha inválidos');
  }
}
