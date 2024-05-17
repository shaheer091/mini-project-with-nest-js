import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../models/post.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}
  savePost(data: any) {
    const { userId, title, description, price, isAvailable } = data;
    if (!userId || !title || !description || !price || !isAvailable) {
      return { message: 'all fields are required' };
    } else if (price < 0) {
      return { message: 'price must be greater than 0' };
    } else {
      new this.postModel({
        userId,
        title,
        description,
        price,
        isAvailable,
      }).save();
      return { message: 'new post saved' };
    }
  }
}
