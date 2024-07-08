import React, { useState, useEffect, useRef } from 'react';
import './PostItem.css';

const PostItem = ({ post, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <div className="user-info">
          {post.profilePic && (
            <img src={post.profilePic} alt="Profile Pic" className="profile-pic" />
          )}
          <h5>{post.username}</h5>
        </div>
        <div className="menu-icon" onClick={handleMenuToggle}>
          &#x22EE;
        </div>
        {showMenu && (
          <div ref={menuRef} className="post-menu">
            <button onClick={() => onEdit(post.id)}>Edit</button>
            <button onClick={() => onDelete(post.id)}>Delete</button>
          </div>
        )}
      </div>
      <h5>{post.title}</h5>
      <p>{post.content}</p>
      <div className='content-file'>
        {post.images && post.images.map((image, index) => (
          <img key={index} src={image} alt={`Post Image ${index}`} className="post-image" />
        ))}
      </div>
      <div className='content-file'>
        {post.videos && post.videos.map((video, index) => (
          <video key={index} controls className="post-video">
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
};

export default PostItem;
