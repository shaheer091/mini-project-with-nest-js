import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUser(): string {
    console.log('hello');
    return 'get user';
  }
  @Post('register')
  registerUser(@Body() name: any): any {
    const {username, password}= name;
    return `User registered successfully`;
  }
}
