'use client'

import React, { useState,useEffect } from 'react';

const SocialModal = ({ isOpen, onClose, setPosts, posts }) => {
    const [newPost, setNewPost] = useState({ title: '', description: '', image: '', name: '' });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (!isOpen) {
          document.body.style.overflow = 'auto';
        }
      }, [isOpen]);

    if (!isOpen) return null;

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

    const handleCreatePost = () => {
        const newPostData = {
            ...newPost,
            id: posts.length + 1,
            image: imagePreview,
            reactions: 0,
            comments: [],
            isLiked: false,
            name: newPost.name || 'demo', // Use "demo" if name is not provided
        };
        setPosts([...posts, newPostData]);
        setNewPost({ title: '', description: '', image: '', name: '' });
        setImagePreview('');
        onClose(); // Close the modal after creating the post
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#fedeca] bg-opacity-95 p-4 rounded-xl shadow-md w-full max-w-3xl h-105 relative">
                <div className='pt-2 pb-4'>
                    <button onClick={onClose} className="transform transition duration-300 hover:bg-[#c75757] shadow-lg px-4 py-2 text-white rounded-full bg-[#df7676] absolute right-2">
                        Cancel Post
                    </button>
                    <h3 className="text-2xl font-semibold mb-2 text-[#6bb3b3]">Create Post</h3>
                </div>
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
        </div>
    );
};

export default SocialModal;
