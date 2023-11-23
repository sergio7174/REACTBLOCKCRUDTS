import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IShowModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  text: string;
  title: string;
}

const ModalCreatePost: React.FC<IShowModal> = ({
  active,
  setActive,
  setText,
  setTitle,
  text,
  title,
  handleSubmit,
}) => {
  const handleClose = () => {
    setActive(false);
  };
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modal-content active' : 'modal-content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-create-header-wrapper">
          <h3>Create post</h3>
          <button className="cancel-btn" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-input"
          />
          <button type="submit" className="btn-action">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreatePost;
