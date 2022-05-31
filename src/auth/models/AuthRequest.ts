import { Request } from 'express';
import { Reseller } from 'src/domains/resellers/entities/resellers.entity';

export interface AuthRequest extends Request {
  user: Reseller;
}
