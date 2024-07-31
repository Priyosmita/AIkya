'use client';

import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'First Post',
    description: 'This is the description of the first post.',
    reactions: 0,
    comments: [],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'Second Post',
    description: 'This is the description of the second post.',
    reactions: 0,
    comments: [],
  },
];

const SocialMedia = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: '' });
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleReaction = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, reactions: post.reactions + 1 } : post));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  const handleCreatePost = () => {
    setPosts([...posts, { ...newPost, id: posts.length + 1, reactions: 0, comments: [] }]);
    setNewPost({ title: '', description: '', image: '' });
    setShowCreatePost(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreatePost(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          +
        </button>
      </div>

      {showCreatePost && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="mb-2">Create Post</h3>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPost.image}
            onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <button onClick={handleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded">
            Share
          </button>
        </div>
      )}

      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <img src={post.image} alt={post.title} className="mb-2 w-full h-48 object-cover" />
          <h3 className="text-xl mb-2">{post.title}</h3>
          <p className="mb-2">{post.description}</p>
          <div className="flex justify-between items-center mb-2">
            <div>
              <button onClick={() => handleReaction(post.id)} className="mr-2">👍 {post.reactions}</button>
              <button className="mr-2">💬</button>
              <button>🔗</button>
            </div>
          </div>
          <div className="mb-2">
            {post.comments.map((comment, index) => (
              <p key={index} className="mb-1 border-t pt-1">{comment}</p>
            ))}
            <input
              type="text"
              placeholder="Add a comment"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleComment(post.id, e.target.value);
                  e.target.value = '';
                }
              }}
              className="p-2 border rounded w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
