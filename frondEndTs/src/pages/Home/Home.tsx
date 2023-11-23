import React from 'react';
import Header from '../../components/header/Header';
import ModalEditPost from '../../components/modal/ModalEditPost';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { handleDeletePost } from '../../services/Home/serviceHandleDeletePost';
import { ServiceHomeCreatePost } from '../../services/Home/serviceHomeCreatePost';
import { UseHome } from '../../Hooks/UseHome';
import { handleEditPost } from '../../functions/FunctionHandleEditPost';

const Home: React.FC = () => {
  const {
    posts,
    setPosts,
    modalEditPostActive,
    setModalEditPostActive,
    modalCreatePostActive,
    setModalCreatePostActive,
    text,
    setText,
    user,
  } = UseHome(); // function coming from Hooks/UseHome

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      ServiceHomeCreatePost(posts, text, setPosts, setModalEditPostActive);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ModalEditPost
        active={modalEditPostActive}
        setActive={setModalEditPostActive}
        handleSubmit={handleSubmit}
        text={text}
        setText={setText}
      />
      <Header
        name={user?.name}
        active={modalCreatePostActive}
        setActive={setModalCreatePostActive}
        setPosts={setPosts}
      />
      <div className="wrapper">
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="card-wrapper">
              <div className="card-header-wrapper">
                <h2>{post.user.name}</h2>
                <div>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEditPost(post._id, posts, user, setModalEditPostActive, setText)
                    }
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePost(post._id, posts, post, user, setPosts)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
              <div className="text-container">
                <h3>{post.text}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
