'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import axios from 'axios';

const SocialPostControl = () => {
    const [posts, setPosts] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts'); // Adjust the URL to match your endpoint
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            // Make API call to delete the post
            await axios.delete(`http://localhost:5000/api/posts/${postId}`);

            // Filter out the deleted post from the state
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

            // Close the dropdown menu
            setActiveDropdown(null);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (postId) => {
        setActiveDropdown(prevId => (prevId === postId ? null : postId));
    };

    return (
        <>
            <h2 className="text-[#7ebaba] text-4xl mt-12 mb-6">Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="relative border bg-opacity-50 rounded-lg shadow-md p-4 bg-white">
                        {/* Three-dots dropdown */}
                        <div className="relative flex top-0 justify-end" ref={dropdownRef}>
                            <button
                                className='text-gray-400 hover:text-gray-600 transition duration-100'
                                onClick={() => toggleDropdown(post.id)}
                            >
                                <FaEllipsisV />
                            </button>
                            {activeDropdown === post.id && (
                                <div className="absolute hover:bg-[#fac9aa] right-0 mt-2 py-2 w-20 bg-[#fedeca] rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 cursor-pointer text-gray-700 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                        <h3 className="text-[#6bb3b3] text-xl pb-2 pl-2 pr-2">{post.title}</h3>
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default SocialPostControl;
