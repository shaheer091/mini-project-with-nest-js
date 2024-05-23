// user.model.ts
import * as mongoose from 'mongoose';
import { PostSchema } from './post.schema';

export interface Post extends mongoose.Document {
  userId: mongoose.Types.ObjectId,
  title: string;
  content: string;
}

export const PostModel = mongoose.model<Post>('Post', PostSchema);
