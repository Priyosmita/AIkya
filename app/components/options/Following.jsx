'use client';

import React, { useState } from 'react';

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
    <div className='text-black p-10'>

      {/* Search Bar */}
      <div className='mb-4'>
        <input
          type="text"
          placeholder="Search by name or industry"
          className="p-2 border rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className='space-y-4'>
        {filteredFollowing.map(person => (
          <li key={person.id} className='flex items-center justify-between p-4 bg-white bg-opacity-50 shadow-lg rounded-lg'>
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
      {selectedProfile && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-2xl h-auto'>
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
            <button
              className='mt-4 bg-[#7ebaba] hover:scale-110 transition duration-300 hover:bg-[#6cbaba] text-white border border-blue-500 p-2 rounded'
              onClick={handleCloseProfile}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Following;
