'use client';

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../components.css";

const initialPosts = [
  {
    id: 1,
    profilePic: 'https://media.licdn.com/dms/image/D4E03AQF994QfoNMUBA/profile-displayphoto-shrink_200_200/0/1706964303726?e=2147483647&v=beta&t=kvqaovcfqEGsj35xJaAo6o6MSmvuvn_mThbzHTFyy3U',
    name: 'Priyosmita Das',
    image: 'https://github.com/Priyosmita/Kali-Yug/blob/main/Environment%20Design/Environment%207.png?raw=true',
    title: 'What is Unreal Engine?',
    description: 'Unreal engine is an advance game development platform to create high end games. It uses C++ in the background.',
    reactions: 0,
    comments: [],
    isLiked: false,
  },
  {
    id: 2,
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nS0JgHTRTOZC5dkRUpA9ZqQCY8xsN45RgEMs_OYuet1UcN5zJDj-9oCHlPj65hla51I&usqp=CAU',
    name: 'Rijuraj Datta',
    image: 'https://www.dicsinnovatives.com/blog/wp-content/uploads/2023/08/python-blog-image.jpg',
    title: 'Best languages to learn as beginner',
    description: 'Python is a high level programming language used in mainly AI and Ml and it is also very user friendly.',
    reactions: 0,
    comments: [],
    isLiked: false,
  },
];

const SocialMedia = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', description: '', image: '' });
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
  const router = useRouter();

  const handleReaction = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, reactions: post.isLiked ? post.reactions - 1 : post.reactions + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, { ...comment, likes: 0, isLiked: false, replies: [] }] }
        : post
    ));
  };

  const handleReply = (postId, commentIndex, reply) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.map((comment, index) =>
            index === commentIndex
              ? { ...comment, replies: [...comment.replies, { text: reply, likes: 0, isLiked: false }] }
              : comment
          )
        }
        : post
    ));
  };

  const handleLikeComment = (postId, commentIndex, replyIndex = null) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.map((comment, index) =>
            index === commentIndex
              ? replyIndex === null
                ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
                : {
                  ...comment,
                  replies: comment.replies.map((reply, rIndex) =>
                    rIndex === replyIndex
                      ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                      : reply
                  )
                }
              : comment
          )
        }
        : post
    ));
  };


  const handleCreatePost = () => {
    setPosts([...posts, { ...newPost, id: posts.length + 1, image: imagePreview, reactions: 0, comments: [], isLiked: false }]);
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

  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
  };

  const closeCommentModal = () => {
    setSelectedPostId(null);
    setActiveReply(null);
  };

  const navigateToProfile = (username) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="SocialWidth h-104 text-black overflow-hidden flex flex-col">
      <div className="flex justify-end mb-10">
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className={`bg-[#7ebaba] text-white px-4 py-2 rounded-full transition-transform transform ${showCreatePost ? 'bg-red-500' : 'bg-[#7ebaba]'}`}
        >
          {showCreatePost ? 'Cancel Post' : 'Add Post'}
        </button>
      </div>

      {showCreatePost && (
        <div className="mb-4 p-4 border rounded bg-white shadow-md overflow-y-auto">
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
          <div key={post.id} className="mb-4 p-4 border-black rounded shadow-lg bg-transparent">
            <div className="flex items-center mb-2">
              <img src={post.profilePic} alt={`${post.name}'s profile`} className="w-12 h-12 rounded-full" />
              <div className="ml-4 flex items-center">
                <p
                  className="font-semibold cursor-pointer"
                  onClick={() => navigateToProfile(post.name)}
                >
                  {post.name}
                </p>
              </div>
            </div>
            <img src={post.image} alt={post.title} className="mb-2 object-cover h-full w-full" />
            <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
            <p className="mb-2">{post.description}</p>
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-5">
                <button
                  onClick={() => handleReaction(post.id)}
                  className="text-2xl"
                  style={{ color: post.isLiked ? '#6bb3b3' : '#6bb3b3' }}
                >
                  {post.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                </button>
                <button
                  className="text-[#6bb3b3] text-2xl"
                  onClick={() => openCommentModal(post.id)}
                >
                  <FaRegComment />
                </button>
                <button className="text-[#6bb3b3] text-2xl"><IoShareSocial /></button>
              </div>
            </div>
            <div className="mb-2">
              <p className="text-[#6bb3b3]">{post.reactions} Likes</p>
              {post.comments.slice(0, 2).map((comment, index) => (
                <p key={index} className="mb-1 border-t pt-1 text-gray-600">{comment.text}</p>
              ))}
              {post.comments.length > 2 && (
                <button
                  onClick={() => openCommentModal(post.id)}
                  className="text-blue-500 text-sm mt-2"
                >
                  View all comments
                </button>
              )}
              <input
                type="text"
                placeholder="Add a comment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post.id, { text: e.target.value, user: 'Current User' });
                    e.target.value = '';
                  }
                }}
                className="p-2 border rounded w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedPostId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl overflow-y-auto h-105">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <div>
              {posts.find(post => post.id === selectedPostId).comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p
                      className="font-semibold cursor-pointer"
                      onClick={() => navigateToProfile(comment.user)}
                    >
                      {comment.user}
                    </p>
                    <button
                      onClick={() => handleLikeComment(selectedPostId, index)}
                      className="text-2xl"
                      style={{ color: comment.isLiked ? '#6bb3b3' : '#6bb3b3' }}
                    >
                      {comment.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                    </button>
                  </div>
                  <p className="mb-2 text-gray-600">{comment.text}</p>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="ml-4 mb-2 border-t pt-1">
                      <p className="text-sm text-gray-600">{reply.text}</p>
                      <button
                        onClick={() => handleLikeComment(selectedPostId, index, replyIndex)}
                        className="text-xs text-[#6bb3b3]"
                      >
                        {reply.isLiked ? <AiFillLike /> : <AiOutlineLike />} {reply.likes}
                      </button>

                    </div>
                  ))}
                  {activeReply === index ? (
                    <input
                      type="text"
                      placeholder="Reply..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleReply(selectedPostId, index, e.target.value);
                          e.target.value = '';
                          setActiveReply(null);
                        }
                      }}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    <button
                      onClick={() => setActiveReply(index)}
                      className="text-blue-500 text-sm"
                    >
                      Reply
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={closeCommentModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;