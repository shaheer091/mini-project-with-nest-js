// user.schema.ts
import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
});
