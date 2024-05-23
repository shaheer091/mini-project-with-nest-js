import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
}
