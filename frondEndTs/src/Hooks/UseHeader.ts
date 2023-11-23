import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserId } from '../redux/auth/authSlice';
import { useAppDispatch } from '../redux/hooks/Hooks';

export const UseHeader = () => {
  /** Driving local variables from component */
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userId = useSelector(selectUserId);

  return { dispatch, title, text, isAuthenticated, userId, setText, setTitle };
};
