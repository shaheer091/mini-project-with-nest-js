import { Injectable } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class UserService {
  constructor(private adminServ:AdminService){}
  getUserHome(){
    return this.adminServ.getAllPost()
  }
}
