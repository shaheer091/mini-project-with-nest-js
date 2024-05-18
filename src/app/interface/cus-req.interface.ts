import { Request } from 'express';

export interface CustomRequest extends Request {
  userId?: any;  // Define userId or the entire decoded token here
}
