import { model, Schema } from "mongoose";
import { IUser } from "../types/IUser";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
