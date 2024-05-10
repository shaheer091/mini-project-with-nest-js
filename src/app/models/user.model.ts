// user.model.ts
import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';

export interface User extends mongoose.Document {
  username: string;
  email:string;
  password: string;
  isAdmin: Boolean;
}

export const UserModel = mongoose.model<User>('User', UserSchema);
