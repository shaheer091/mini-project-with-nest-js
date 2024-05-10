import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './app/models/user.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from './jwt.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async saveUser(data: any): Promise<any> {
    const { username, email, password, confirmPassword } = data;
    if (!username || !email || !password || !confirmPassword) {
      return { message: 'please the required fields' };
    }
    if (password !== confirmPassword) {
      return { message: 'the password doesnt match' };
    }
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      if (existingUser.username == username) {
        return { message: 'the username is already taken' };
      } else if (existingUser.email == email) {
        return { message: 'the account with this email already exist' };
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
      });
      const payload ={
        userId: newUser._id,
        username,
        email
      }
      const token = this.jwtService.sign(payload)
      await newUser.save();
      return { message: 'user is saved', success: true, token };
    }
  }

  async userLogin(data: any) {
    const { username, password } = data;
    const user = await this.userModel.findOne({ username });
    console.log(user);
    if (!user) {
      return { message: 'User doesnot exist' };
    } else {
      const validPassord = await bcrypt.compare(password, user.password);
      if (!validPassord) {
        return { message: 'Invalid Password' };
      } else {
        const payload ={
          userId: user._id,
          username,
          email: user.email,
        }
        const token = this.jwtService.sign(payload)
        return { message: 'user successfully logged in', success: true, token };
      }
    }
  }
}
