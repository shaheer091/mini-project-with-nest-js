import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../models/post.model';
import * as mongoose from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  async savePost(data: any, userId: any) {
    const { title, content } = data;
    if (!userId || !title || !content) {
      return { message: 'all fields are required' };
    } else {
      await new this.postModel({
        userId,
        title,
        content,
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
  getAllUsers() {
    return this.userModel.find({ isAdmin: false });
  }
  async deleteUser(id: any) {
    const userId = new mongoose.Types.ObjectId(id.userId);
    if (!userId) {
      return { message: 'no user found in this id' };
    } else {
      const result = await this.userModel.findByIdAndDelete(userId);
      if (result) {
        return { message: 'user deleted successfully' };
      } else {
        return { message: 'something went wrong' };
      }
    }
  }

  async getAdminHome() {
    const user = await this.userModel
      .find({ isAdmin: false })
      .countDocuments()
      .exec();
    const post = await this.postModel.countDocuments().exec();
    return { user, post };
  }
}
