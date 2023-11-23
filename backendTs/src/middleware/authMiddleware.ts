import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/IUser";

interface CustomRequest extends Request {
  user?: IUser;
}

const protect = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Missing jwt token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Missing token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN as Secret);
    req.user = decoded as IUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default protect;
