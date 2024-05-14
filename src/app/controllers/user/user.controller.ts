import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from 'src/app/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userServ:UserService){}
  @Post('updateUserProfile')
  updateUserProfile(@Body() body:any) {
    return this.userServ.updateUserProfile(body)
  }
}
