import React from 'react';
import { logout } from '../../redux/auth/authSlice';
import './Header.css';
import ModalCreatePost from '../modal/ModalCreatePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { serviceHeader } from '../../services/header/serviceHeader';
import { HeaderProps } from '../../interface/HeaderProps';
import { UseHeader } from '../../Hooks/UseHeader';

/**eact. FC is a type that stands for "Function Component" in React. It is a generic type that allows you to specify the props that a function component will accept. */
/**HeaderProps comes from interface above */
const Header: React.FC<HeaderProps> = ({ name, active, setActive, setPosts }) => {
  const { dispatch, title, text, isAuthenticated, userId, setText, setTitle } = UseHeader(); // function coming from Hooks/UseHeader

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClick = () => {
    setActive(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post = await serviceHeader(title, text, userId);

    setActive(false);
    setTitle('');
    setText('');

    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <header>
      <ModalCreatePost
        active={active}
        setActive={setActive}
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setText={setText}
        text={text}
        title={title}
      />
      <nav>
        <div className="logo">
          <a href="/">Blogster</a>
        </div>
        <div className="nav-links">
          <p>Hello, {name}</p>
          <ul>
            <li>
              <button onClick={handleClick} className="create-btn">
                Create Post
              </button>
            </li>
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout} className="exit-btn">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
