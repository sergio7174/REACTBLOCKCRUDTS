import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  text: string;
  user: mongoose.Types.ObjectId;
  avatarUrl: string;
}
