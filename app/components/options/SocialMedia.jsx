'use client';

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoCloseSharp } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import "../components.css";
import "./options.css";


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
  const [showShareModal, setShowShareModal] = useState(false); // To manage share modal visibility
  const [currentPostId, setCurrentPostId] = useState(null); // To track the post ID for the share modal
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

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

  const handleShareClick = (postId) => {
    setCurrentPostId(postId);
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCurrentPostId(null);
  };
  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="SocialWidth h-104 text-black overflow-hidden flex flex-col">

      <div className="flex justify-between">
        {/* Search bar */}
        <div className="relative">
          <button
            className='pb-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search people, posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 p-2 border rounded-full w-101"
          />
        </div>

        {/* add post or cancel post */}
        <div className="pt-4 mb-10">
          <button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className={`bg-[#7ebaba] text-white px-4 py-2 rounded-full transition-transform transform ${showCreatePost ? 'bg-red-500' : 'bg-[#7ebaba]'}`}
          >
            {showCreatePost ? 'Cancel Post' : 'Add Post'}
          </button>
        </div>
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
        {filteredPosts.map((post) => (
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
                <div className="flex flex-row gap-x-2">
                  <button
                    onClick={() => handleReaction(post.id)}
                    className="text-2xl"
                    style={{ color: post.isLiked ? '#6bb3b3' : '#6bb3b3' }}
                  >
                    {post.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                  </button>
                  <p className="text-[#6bb3b3] text-xl">{post.reactions}</p>
                </div>

                <div className="flex flex-row gap-x-2">
                  <button
                    className="text-[#6bb3b3] text-2xl"
                    onClick={() => openCommentModal(post.id)}
                  >
                    <FaRegComment />
                  </button>
                  <p className="text-[#6bb3b3] text-xl">{post.comments.length}</p>
                </div>
                <button className="text-[#6bb3b3] text-2xl" onClick={() => handleShareClick(post.id)}>
                  <IoShareSocial />
                </button>
              </div>
            </div>

            <div className="mb-2">
              {post.comments.slice(0, 2).map((comment, index) => (
                <p key={index} className="mb-1 border-t pt-1 text-gray-600">{comment.text}</p>
              ))}
              {post.comments.length > 2 && (
                <button
                  onClick={() => openCommentModal(post.id)}
                  className="text-[#6bb3b3] text-lg mt-2"
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


      {/* Commenting */}
      {selectedPostId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl w-full max-w-3xl h-105">
            <div className="sticky top-0 z-50 flex flex-row justify-between p-2">
              <h3 className="text-2xl text-[#6bb3b3] font-semibold cursor-default">Comments</h3>
              <button
                onClick={closeCommentModal}
                className="text-[#6bb3b3] text-3xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
              >
                <IoCloseSharp />
              </button>
            </div>


            <div className="relative h-106 bg-opacity-95 overflow-y-auto custom-scrollbar">
              {posts.find(post => post.id === selectedPostId).comments.map((comment, index) => (
                <div key={index} className="mb-4">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <img src={comment.profilePic} alt="profile" className="w-8 h-8 rounded-full mr-2 mb-3" /> {/* Profile pic */}
                      <div className="flex items-center mb-2">
                        <p
                          className="font-semibold cursor-pointer"
                          onClick={() => navigateToProfile(comment.user)}
                        >
                          {comment.user}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleLikeComment(selectedPostId, index)}
                        className="text-xl"
                        style={{ color: comment.isLiked ? '#6bb3b3' : '#6bb3b3' }}
                      >
                        {comment.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                      </button>
                      <p className="ml-2 text-[#6bb3b3]">{comment.likes} </p> {/* Display the number of likes */}
                    </div>
                  </div>
                  <p className="mb-2 text-gray-600">{comment.text}</p>
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="ml-4 mb-2 border-t pt-1">
                      <p className="text-sm text-gray-600">{reply.text}</p>
                      <div className="flex items-center">
                        <button
                          onClick={() => handleLikeComment(selectedPostId, index, replyIndex)}
                          className="text-xl text-[#6bb3b3]"
                        >
                          {reply.isLiked ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        <p className="ml-2 text-[#6bb3b3]">{reply.likes} </p> {/* Display the number of likes for replies */}
                      </div>
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
                      className="text-[#6bb3b3] text-sm"
                    >
                      Reply
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Sharing */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl w-96 text-center">
            <div className="flex flex-row justify-between">
              <h3 className="text-xl font-semibold mb-4 text-[#6bb3b3] cursor-default">Share Via</h3>
              <div className="pb-1">
                <button
                  onClick={closeShareModal}
                  className="text-[#6bb3b3] text-2xl transform transition duration-150 hover:text-[#1f6262]"
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>

            <div className="flex justify-around text-2xl mb-4 space-x-9">
              <span className="cursor-pointer text-3xl transform transition duration-150 hover:text-[#6bb3b3]" onClick={() => alert('<FaLink/>')}>
                <FaLink />
              </span>
              <span className="cursor-pointer text-3xl transform transition duration-150 hover:text-[#6bb3b3]" onClick={() => alert('<FaWhatsapp/>')}>
                <FaWhatsapp />
              </span>
              <span className="cursor-pointer text-3xl transform transition duration-150 hover:text-[#6bb3b3]" onClick={() => alert('<CiFacebook/>')}>
                <FaFacebook />
              </span>
              <span className="cursor-pointer text-3xl transform transition duration-150 hover:text-[#6bb3b3]" onClick={() => alert('<FaInstagram/>')}>
                <FaInstagram />
              </span>
              <span className="cursor-pointer text-3xl transform transition duration-150 hover:text-[#6bb3b3]" onClick={() => alert('<FaXTwitter />')}>
                <FaXTwitter />
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SocialMedia;