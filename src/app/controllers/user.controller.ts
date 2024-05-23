import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/app/services/user.service';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userServ:UserService){}

  @Get('getHome')
  getUserHome(){
    return this.userServ.getUserHome()
  }
}
