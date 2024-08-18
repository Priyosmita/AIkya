'use client';

import React, { useState,useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

// Sample static following data
const followingData = [
  {
    id: 1,
    name: 'Rijuraj Datta',
    industry: 'Tech',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png'
  },
  {
    id: 2,
    name: 'Frank Harris',
    industry: 'Finance',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg'
  },
  {
    id: 4,
    name: 'Henry Wilson',
    industry: 'Health',
    profilePic: 'https://www.live4india.com/images/users/6.jpg'
  }
];

const Following = () => {
  const [following, setFollowing] = useState(followingData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedProfile) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedProfile]);

  const filteredFollowing = following.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id) => {
    setFollowing(following.filter(person => person.id !== id));
  };

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="relative pl-9 pb-7 pt-4">
        <button
          className='pl-9 pt-4 pb-7 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
        >
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search people, posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-lg pl-10 text-black p-2 border rounded-full w-108"
        />
      </div>

      <div className='text-black pl-10 pr-10 pb-4 h-106 overflow-y-auto custom-scrollbar'>
        <ul className='space-y-4'>
          {filteredFollowing.map(person => (
            <li key={person.id} className='h-16 flex items-center justify-between p-4 bg-white bg-opacity-50 shadow-lg rounded-lg'>
              <div className='flex items-center'>
                <img src={person.profilePic} alt={`${person.name}'s profile`} className='w-12 h-12 rounded-full' />
                <div className='ml-4'>
                  <p className='font-semibold'>{person.name}</p>
                  <p className='text-sm text-gray-500'>{person.industry}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <button
                  className='font-bold bg-[#7ebaba] hover:bg-[#6cbaba] text-white px-4 py-2 rounded-full  hover:scale-110 transition duration-200'
                  onClick={() => handleViewProfile(person)}
                >
                  See Full Profile
                </button>
                <button
                  className='bg-[#f8b891] text-white px-4 py-2 rounded-full  font-bold hover:scale-110 transition duration-200'
                  onClick={() => handleRemove(person.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Profile Popup */}
        {/* Profile Popup */}
        {selectedProfile && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='relative bg-[#fedeca] bg-opacity-95 p-8 rounded-xl shadow-lg w-[90%] max-w-2xl h-auto'>
              <button
                className="absolute top-4 right-4 text-[#6bb3b3] text-3xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
                onClick={handleCloseProfile}
              >
                <IoCloseSharp />
              </button>
              <div className='flex items-center mb-4'>
                <img src={selectedProfile.profilePic} alt={`${selectedProfile.name}'s profile`} className='w-32 h-32 rounded-full' />
                <div className='ml-4'>
                  <p className='text-2xl font-semibold'>{selectedProfile.name}</p>
                  <p className='text-lg text-gray-500'>{selectedProfile.industry}</p>
                </div>
              </div>
              <p className='text-gray-700'>
                <p>Industry: {selectedProfile.industry}</p>
                <p>About: An enthusiastic person in the {selectedProfile.industry} industry.</p>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Following;
