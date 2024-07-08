import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsDisplay from './components/PostDisplay';
import CreatePost from './components/CreatePost';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" exact element={<PostsDisplay />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<CreatePost />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
