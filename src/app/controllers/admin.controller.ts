import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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
    return this.adminServ.savePost(data, userId);
  }

  @Get('seePost')
  async seeAllPost() {
    return this.adminServ.getAllPost();
  }

  @Delete('deletePost/:id')
  async deletePost(@Param() id:any){
    return this.adminServ.deletePost(id)
  }

  @Get('seeAllUsers')
  async seeAllUsers(){
    return this.adminServ.getAllUsers()
  }
  @Delete('deleteUser/:userId')
  async deleteUser(@Param() userId:any){
    return this.adminServ.deleteUser(userId)
  }
  @Get('home')
  async home(){
    return await this.adminServ.getAdminHome()
  }
}
