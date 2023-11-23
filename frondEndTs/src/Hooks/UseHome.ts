import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../interface/IPost';
import { fetchPosts } from '../services/Home/serviceHomePost';

export const UseHome = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [modalEditPostActive, setModalEditPostActive] = useState<boolean>(false);
  const [modalCreatePostActive, setModalCreatePostActive] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    /**call to fetchPost function */
    fetchPosts(setPosts);

    if (!isAuthenticated) {
      navigate('/login');
    } else {
      /**call to fetchPost function */
      fetchPosts(setPosts);
    }
  }, [isAuthenticated, navigate]);

  return {
    posts,
    setPosts,
    modalEditPostActive,
    setModalEditPostActive,
    modalCreatePostActive,
    setModalCreatePostActive,
    text,
    setText,
    isAuthenticated,
    user,
    navigate,
  };
};
