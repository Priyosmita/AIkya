'use client';

import React, { useState } from 'react';

// Sample static following data
const followingData = [
  {
    id: 1,
    name: 'Eve Adams',
    industry: 'Tech',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png'
  },
  {
    id: 2,
    name: 'Frank Harris',
    industry: 'Finance',
    profilePic: 'profile-pic-url-6.jpg'
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'profile-pic-url-7.jpg'
  },
  {
    id: 4,
    name: 'Henry Wilson',
    industry: 'Health',
    profilePic: 'profile-pic-url-8.jpg'
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
    <div className='text-black p-4'>
      <h1 className='text-3xl mb-4'>Following</h1>

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
          <li key={person.id} className='flex items-center justify-between p-4 bg-white shadow rounded-lg'>
            <div className='flex items-center'>
              <img src={person.profilePic} alt={`${person.name}'s profile`} className='w-12 h-12 rounded-full' />
              <div className='ml-4'>
                <p className='font-semibold'>{person.name}</p>
                <p className='text-sm text-gray-500'>{person.industry}</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                className='text-blue-500 border border-blue-500 p-2 rounded'
                onClick={() => handleViewProfile(person)}
              >
                See Full Profile
              </button>
              <button
                className='text-red-500 border border-red-500 p-2 rounded'
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
          <div className='bg-white p-6 rounded-lg shadow-lg w-80'>
            <div className='flex items-center'>
              <img src={selectedProfile.profilePic} alt={`${selectedProfile.name}'s profile`} className='w-24 h-24 rounded-full' />
              <div className='ml-4'>
                <p className='text-xl font-semibold'>{selectedProfile.name}</p>
                <p className='text-sm text-gray-500'>{selectedProfile.industry}</p>
              </div>
            </div>
            <p className='mt-4 text-gray-700'>
              {/* Profile Details */}
              Here you can put more details about {selectedProfile.name}.
            </p>
            <button
              className='mt-4 text-blue-500 border border-blue-500 p-2 rounded'
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
