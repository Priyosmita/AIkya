'use client';

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoShareSocial } from "react-icons/io5";
import { FaRegComment, FaLink, FaWhatsapp, FaFacebook, FaInstagram, FaXTwitter, FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import "../components.css";
import "./options.css";
import SocialModal from "./SocialModal";

const SocialMedia = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Fetch the posts from the database
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        console.log("Posts fetched successfully");
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleReaction = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            reactions: post.isLiked ? post.reactions - 1 : post.reactions + 1
          }
        : post
    ));
  };


  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...(post.comments || []), { text: commentText, user: 'Current User', likes: 0, isLiked: false, replies: [] }] }
        : post
    ));
  };

  const handleReply = (postId, commentIndex, replyText) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
          ...post,
          comments: post.comments.map((comment, index) =>
            index === commentIndex
              ? { ...comment, replies: [...(comment.replies || []), { text: replyText, likes: 0, isLiked: false }] }
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

  const openCommentModal = (postId) => {
    setSelectedPostId(postId);
    document.body.style.overflow = 'hidden';
  };

  const closeCommentModal = () => {
    setSelectedPostId(null);
    setActiveReply(null);
    document.body.style.overflow = 'auto';
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
    (post.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (post.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="SocialWidth h-104 text-black overflow-hidden flex flex-col">
      <div className="flex justify-between pt-4">
        <div className="relative pl-4">
          <button className='pb-10 pl-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search people, posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-lg pl-10 p-2 border rounded-full w-101"
          />
        </div>

        <div className="mb-10 pr-">
          <button
            className="transform transition duration-300 hover:scale-110 shadow-lg px-4 py-2 text-white rounded-full bg-[#7ebaba]"
            onClick={() => {
              setShowCreatePost(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            Create Post
          </button>
          <SocialModal
            isOpen={showCreatePost}
            onClose={() => {
              setShowCreatePost(false);
              document.body.style.overflow = 'auto';
            }}
            setPosts={setPosts}
            posts={posts}
          />
        </div>
      </div>

      <div className="max-h-screen overflow-y-auto custom-scrollbar">
        {filteredPosts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border-black rounded shadow-lg bg-transparent">
            <div className="flex items-center mb-2">
              <img src={post.profilePic || "/assets/profile.jpg"} alt={`${post.name || 'demo'}'s profile`} className="w-12 h-12 rounded-full" />
              <div className="ml-4 flex items-center">
                <p
                  className="font-semibold cursor-pointer"
                  onClick={() => navigateToProfile(post.name || 'demo')}
                >
                  {post.name || 'Priyosmita Das'}
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
                </div>
                <button className="text-[#6bb3b3] text-2xl" onClick={() => handleShareClick(post.id)}>
                  <IoShareSocial />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPostId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-16">
          <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl w-full max-w-3xl h-105">
            <div className="sticky top-0 z-50 flex flex-row justify-between p-2">
              <h3 className="text-2xl text-[#6bb3b3] font-semibold cursor-default">Comments</h3>
              <button
                onClick={closeCommentModal}
                className="text-[#6bb3b3] text-3xl rounded-full transform transition duration-110 hover:text-[#1f6262]"
              >
                <IoCloseSharp />
              </button>
            </div>

            <div className="relative h-106 bg-opacity-95 overflow-y-auto">
  {posts.find(post => post.id === selectedPostId)?.comments?.map((comment, index) => (
    <div key={index} className="mb-4 p-2">
      <div className="flex items-center mb-2">
        <img src="/assets/profile.jpg" alt="profile" className="w-8 h-8 rounded-full mr-2" />
        <p className="font-semibold">Priyosmita Das</p>
      </div>
      <p className="mb-2">{comment.text}</p>
      <div className="flex items-center mb-2">
        <button
          className="mr-2 text-xl"
          onClick={() => handleLikeComment(selectedPostId, index)}
        >
          {comment.isLiked ? <AiFillLike /> : <AiOutlineLike />}
        </button>
        <p className="text-[#6bb3b3] text-xl">{comment.likes}</p>
        <button
          className="ml-4 text-[#6bb3b3] text-xl"
          onClick={() => setActiveReply(index)}
        >
          Reply
        </button>
      </div>
      {activeReply === index && (
        <div className="mt-2">
          <textarea
            placeholder="Write a reply..."
            className="w-full p-2 border rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleReply(selectedPostId, index, e.target.value);
                e.target.value = '';
                setActiveReply(null);
              }
            }}
          />
        </div>
      )}
      {comment.replies?.map((reply, rIndex) => (
        <div key={rIndex} className="mt-2 ml-4 border-t border-gray-300 pt-2">
          <div className="flex items-center mb-2">
            <img src="/assets/profile.jpg" alt="profile" className="w-8 h-8 rounded-full mr-2" />
            <p className="font-semibold">Priyosmita Das</p>
          </div>
          <p className="mb-2">{reply.text}</p>
          <div className="flex items-center">
            <button
              className="mr-2 text-xl"
              onClick={() => handleLikeComment(selectedPostId, index, rIndex)}
            >
              {reply.isLiked ? <AiFillLike /> : <AiOutlineLike />}
            </button>
            <p className="text-[#6bb3b3] text-xl">{reply.likes}</p>
          </div>
        </div>
      ))}
    </div>
  ))}

  <div className="fixed bottom-20 input_width">
    <input
      placeholder="Add a comment..."
      className="w-full p-2 border rounded"
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleComment(selectedPostId, e.target.value);
          e.target.value = '';
        }
      }}
    />
  </div>
</div>

          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-16">
          <div className="bg-[#fedeca] p-6 rounded-xl w-full max-w-md">
            <h3 className="text-2xl text-[#6bb3b3] font-semibold">Share Post</h3>
            <p className="mt-2 text-gray-700">Share this post via:</p>
            <div className="flex flex-col mt-4">
              <button className="flex items-center mb-2 text-[#7ebaba]">
                <FaWhatsapp className="mr-2" /> WhatsApp
              </button>
              <button className="flex items-center mb-2 text-[#7ebaba]">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="flex items-center mb-2 text-[#7ebaba]">
                <FaInstagram className="mr-2" /> Instagram
              </button>
              <button className="flex items-center text-[#7ebaba]">
                <FaXTwitter className="mr-2" /> Twitter
              </button>
            </div>
            <button
              onClick={closeShareModal}
              className="mt-4 text-[#6bb3b3] text-xl"
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
