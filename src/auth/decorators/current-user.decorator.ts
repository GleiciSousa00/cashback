import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reseller } from 'src/domains/resellers/entities/resellers.entity';
import { AuthRequest } from '../models/AuthRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Reseller => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
