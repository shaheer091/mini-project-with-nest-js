import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './app/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from './jwt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  @Post('signup')
  async createUser(@Body() data: any): Promise<any> {
    return this.appService.saveUser(data);
  }

  @Post('login')
  async loginUser(@Body() data: any): Promise<any> {
    return this.appService.userLogin(data);
  }
}
