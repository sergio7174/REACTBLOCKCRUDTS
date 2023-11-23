import { Request, Response } from "express";
import { IPost } from "../types/IPost";
import { IUser } from "../types/IUser";
import Post from "../models/postModel";

interface CustomRequest extends Request {
  user?: IUser;
}

// @desc Get my posts
// @route GET my/posts/
// @access Private

export const getMyPosts = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const posts = await Post.find({ user: req.user?.userId })
    .populate("user", "-password")
    .exec();
  res.status(200).json(posts);
};

// @desc Get all posts
// @route GET /posts
// @access Public

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find({}).populate("user", "name");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    return;
  }
};

// @desc Create post
// @route POST /posts/
// @access Public

export const createPost = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { title, text, avatarUrl } = req.body;
  const userId = req.user?.userId;

  try {
    const post = await Post.create({
      title,
      text,
      user: userId,
      avatarUrl,
    });

    const savedPost = await post.populate("user", "name");
    res.json(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    return;
  }
};

// @desc Edit post
// @route PATCH /posts/:id
// @access Public

export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const postId = req.params.id;
  const { title, text, avatarUrl } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        text,
        avatarUrl,
      },
      {
        new: true,
      }
    ).exec();
    if (!updatedPost) {
      res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Delete post
// @route DELETE /posts/:id
// @access Public

export const deletePost = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    if (post.user.toString() !== req.user?.userId) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
