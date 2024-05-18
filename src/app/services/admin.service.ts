import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../models/post.model';
import * as mongoose from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}
  savePost(data: any, userId: any) {
    const { title, description, price, isAvailable } = data;
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

  getAllPost() {
    return this.postModel.find();
  }

  async deletePost(id: any) {
    const postId = new mongoose.Types.ObjectId(id.id);
    if (!postId) {
      return { message: 'no post found in this id' };
    } else {
      const result = await this.postModel.findByIdAndDelete(postId);

      if (result) {
        return { message: 'post deleted successfully' };
      } else {
        return { message: 'something went wrong' };
      }
    }
  }
}
