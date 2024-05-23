import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/app/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userServ:UserService){}

  @Get('getHome')
  getUserHome(){
    return this.userServ.getUserHome()
  }
}
