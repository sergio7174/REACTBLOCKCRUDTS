import React from 'react';
import { IPost } from '../interface/IPost';

export interface HeaderProps {
  name?: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}
