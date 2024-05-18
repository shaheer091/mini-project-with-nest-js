import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { JwtAuthGuard } from 'src/app/guards/jwt.guard';
import { CustomRequest } from '../interface/cus-req.interface';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminServ: AdminService) {}

  @Post('addPost')
  async addPosts(@Body() data: any, @Req() request: CustomRequest) {
    const userId = request.userId.userId;
    console.log(data);
    console.log(userId);
    return this.adminServ.savePost(data, userId);
  }

  @Get('seePost')
  async seeAllPost() {
    return this.adminServ.getAllPost();
  }
}
