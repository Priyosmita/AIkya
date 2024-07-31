'use client';

import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    profilePic: 'https://via.placeholder.com/50', // Add profile picture URL
    name: 'John Doe', // Add profile name
    image: 'https://via.placeholder.com/150',
    title: 'First Post',
    description: 'This is the description of the first post.',
    reactions: 0,
    comments: [],
  },
  {
    id: 2,
    profilePic: 'https://via.placeholder.com/50', // Add profile picture URL
    name: 'Jane Smith', // Add profile name
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
  const [imagePreview, setImagePreview] = useState('');

  const handleReaction = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, reactions: post.reactions + 1 } : post));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  const handleCreatePost = () => {
    setPosts([...posts, { ...newPost, id: posts.length + 1, image: imagePreview, reactions: 0, comments: [] }]);
    setNewPost({ title: '', description: '', image: '' });
    setImagePreview('');
    setShowCreatePost(false);
  };

  const handleCancelPost = () => {
    setNewPost({ title: '', description: '', image: '' });
    setImagePreview('');
    setShowCreatePost(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 w-1/2 text-black">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className={`bg-blue-500 text-white px-4 py-2 rounded-full transition-transform transform ${
            showCreatePost ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {showCreatePost ? 'Cancel Post' : 'Add Post'}
        </button>
      </div>

      {showCreatePost && (
        <div className="mb-4 p-4 border rounded bg-white shadow-md max-h-96 overflow-y-auto">
          <h3 className="text-2xl font-semibold mb-2">Create Post</h3>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="mb-2 p-2 border rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            className="mb-2 p-2 border rounded w-full h-24"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2 p-2"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2 w-full h-48 object-cover" />}
          <button
            onClick={handleCreatePost}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Share
          </button>
        </div>
      )}

      <div className="max-h-screen overflow-y-auto">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded bg-white shadow-md">
            <div className="flex items-center mb-2">
              <img src={post.profilePic} alt={`${post.name}'s profile`} className="w-12 h-12 rounded-full" />
              <div className="ml-4 flex items-center">
                <p className="font-semibold">{post.name}</p>
              </div>
            </div>
            <img src={post.image} alt={post.title} className="mb-2 object-cover h-96 w-full" />
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="mb-2">{post.description}</p>
            <div className="flex justify-between items-center mb-2">
              <div>
                <button onClick={() => handleReaction(post.id)} className="mr-2 text-gray-600">
                  👍 {post.reactions}
                </button>
                <button className="mr-2 text-gray-600">💬</button>
                <button className="text-gray-600">🔗</button>
              </div>
            </div>
            <div className="mb-2">
              {post.comments.map((comment, index) => (
                <p key={index} className="mb-1 border-t pt-1 text-gray-600">{comment}</p>
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
    </div>
  );
};

export default SocialMedia;
