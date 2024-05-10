import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(payload: any) {
    return jwt.sign(payload, 'Shaheer!123', { expiresIn: '1h' });
  }
  verify(token: string): any {
    return jwt.verify(token, 'Shaheer!123');
  }
}
