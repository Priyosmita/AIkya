'use client'

import React, { useState, useEffect } from 'react';

const SocialModal = ({ isOpen, onClose, setPosts, posts }) => {
    const [newPost, setNewPost] = useState({ title: '', description: '', image: '', name: '' });
    const [imagePreview, setImagePreview] = useState('');
    const [fileName, setFileName] = useState(''); // State to store the file name

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setNewPost({ ...newPost, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreatePost = async () => {
        const { title, description, image } = newPost;

        // Check if all fields are empty
        if (!title && !description && !image) {
            alert('Please fill in at least one field before sharing your post.');
            return; // Prevent the share action
        }

        // Prepare the form data to send to the backend
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (imagePreview) {
            formData.append('image', dataURItoBlob(imagePreview), fileName);
        }

        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const createdPost = await response.json();
                setPosts([...posts, createdPost]);
                setNewPost({ title: '', description: '', image: '', name: '' });
                setImagePreview('');
                onClose(); // Close the modal after creating the post
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleCancelPost = () => {
        setNewPost({ title: '', description: '', image: '' });
        setImagePreview('');
        setFileName('');
        onClose();
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pt-16">
            <div className="bg-[#fedeca] bg-opacity-95 p-4 rounded-xl shadow-md w-full max-w-5xl h-105 relative">

                <div className='pt-2 pb-4'>
                    <button onClick={handleCancelPost} className="transform transition duration-150 hover:bg-[#c75757] shadow-lg px-4 py-2 text-white rounded-full bg-[#df7676] absolute right-2">
                        Cancel Post
                    </button>
                    <h3 className="text-2xl font-semibold mb-2 text-[#59a4a4]">Create Post</h3>
                </div>

                <div className="grid grid-cols-10">
                    <div className="col-span-7 flex flex-col">
                        <div className="flex flex-row pb-4">
                            <label className="w-1/5 py-2 transform transition duration-150 hover:bg-[#569c9c] bg-[#6bb3b3] text-white rounded-full cursor-pointer text-center">
                                Choose File
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            {fileName && (
                                <span className="ml-4 pt-2 text-md cursor-default text-gray-700">{fileName}</span>
                            )}
                        </div>

                        {imagePreview && <img src={imagePreview} alt="Preview" className="mb-2 h-107 w-full object-cover" />}
                    </div>
                    <div className="col-span-3 flex flex-col pl-3 pt-3">
                        <textarea
                            type="text"
                            placeholder="Enter title here..."
                            value={newPost.title}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                            className="mb-2 p-2 border rounded-lg w-full bg-[#fbf0e9]"
                            style={{ height: '7vh', overflowY: 'scroll', lineHeight: '20px' }} /* 2 lines */
                        />
                        <textarea
                            placeholder="Enter description here..."
                            value={newPost.description}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                            className="mb-2 p-2 border rounded-lg w-full bg-[#fbf0e9]"
                            style={{ height: '53vh', overflowY: 'scroll', lineHeight: '20px' }} /* 10 lines */
                        />
                    </div>
                </div>

                <div className='flex justify-center pt-2'>
                    <button
                        onClick={handleCreatePost}
                        className="bg-[#7ebaba] text-xl text-white px-6 shadow-lg py-2 rounded-full hover:scale-110 transform transition duration-150 hover:bg-[#569c9c]"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialModal;
