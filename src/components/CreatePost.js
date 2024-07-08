import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addPost, editPost } from '../redux/postsSlice';
import './CreatePost.css';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const post = useSelector((state) => state.posts.find((post) => post.id === parseInt(id)));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (isEdit && post) {
      setTitle(post.title);
      setContent(post.content);
      setUsername(post.username);
      setProfilePic(post.profilePic);
      setImages(post.images || []);
      setVideos(post.videos || []);
    }
  }, [isEdit, post]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(files.map(file => fileToBase64(file)));
    setImages(base64Images);
  };

  const handleVideoChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Videos = await Promise.all(files.map(file => fileToBase64(file)));
    setVideos(base64Videos);
  }

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setProfilePic(base64);
    }
  };
  const handleProfilePicRemove = () => {
    setProfilePic(null); // Remove profile picture
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const postPayload = {
      title,
      content,
      username,
      profilePic,
      images,
      videos,
    };

    if (isEdit) {
      dispatch(editPost({ id: parseInt(id), ...postPayload }));
    } else {
      dispatch(addPost(postPayload));
    }
    navigate('/');
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="create-post-card">
        <div className="profile-section">
          {profilePic ? (
            <div className="profile-pic-container">
              <img src={profilePic} alt="Profile Pic" className="profile-pic" />
              <button type="button" onClick={handleProfilePicRemove} className="remove-pic-button">
                Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="file-input"
            />
          )}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        
        <div className="file-input-group">
          <label>Choose Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <div className="file-input-group">
          <label>Choose Videos</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="file-input"
          />
        </div>

        <button type="submit" className="submit-button">
          {isEdit ? 'Edit' : 'Create'} Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
