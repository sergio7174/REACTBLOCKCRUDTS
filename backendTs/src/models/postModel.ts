import mongoose, { model, Schema } from "mongoose";
import { IPost } from "../types/IPost";

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
      required: [true, "Please write text for your post"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Did not found user"],
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model<IPost>("Post", postSchema);
