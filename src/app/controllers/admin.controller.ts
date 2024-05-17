import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "../services/admin.service";

@Controller('admin')
export class AdminController {
    constructor(private adminServ:AdminService){}
    @Post('addPost')
    async addPosts(@Body() data:any){
        return this.adminServ.savePost(data)
    }
}