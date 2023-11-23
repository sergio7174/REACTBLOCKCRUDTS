import { IPostUser } from './IPostUser';

export interface IPost {
  _id: string;
  title: string;
  text: string;
  user: IPostUser;
  createdAt: string;
  updatedAt: string;
  __v: string;
}
