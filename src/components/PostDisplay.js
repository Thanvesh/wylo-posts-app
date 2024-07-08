import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostItem from './PostItem';
import { deletePost } from '../redux/postsSlice';
import './PostsDisplay.css';

const PostsDisplay = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className='container'>
      <div className="posts-display">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      <button onClick={() => navigate('/create')}>Create Post</button>
    </div>
  );
};

export default PostsDisplay;
