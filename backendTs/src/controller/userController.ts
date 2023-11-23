import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { IUser } from "../types/IUser";

// @desc Create new user
// @route POST /users/register
// @access Public

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, avatarUrl } = req.body as Pick<
    IUser,
    "name" | "email" | "password" | "avatarUrl"
  >;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }
  const userExists: IUser | null = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User already exists" });
    return;
  }
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);

  const newUser: IUser = new User({
    name,
    email,
    password: hashedPassword,
    avatarUrl,
  });
  const createdUser = await newUser.save();
  const token = jwt.sign(
    { userId: createdUser._id },
    process.env.JWT_ACCESS_TOKEN as Secret,
    {
      expiresIn: "5d",
    }
  );
  if (createdUser) {
    res.status(200).json({
      _id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      token,
    });
  } else {
    res.status(400).json({ error: "Ivalid user data" });
    return;
  }
};

// @desc Login user
// @route POST /users/login
// @access Public

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as Pick<IUser, "email" | "password">;
  if (!email || !password) {
    res.status(400).json({ error: "Please fill all fields" });
    return;
  }
  const user: IUser | null = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const isMatch: boolean = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_ACCESS_TOKEN as Secret,
    {
      expiresIn: "5d",
    }
  );

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token,
  });
};
