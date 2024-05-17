// user.schema.ts
import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
});
