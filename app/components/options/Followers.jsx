'use client';

import React, { useState } from 'react';

// Sample static follower data
const followersData = [
  {
    id: 1,
    name: 'Alice Johnson',
    industry: 'Tech',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png'
  },
  {
    id: 2,
    name: 'Bob Brown',
    industry: 'Finance',
    profilePic: 'profile-pic-url-2.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'profile-pic-url-3.jpg'
  },
  {
    id: 4,
    name: 'David Green',
    industry: 'Health',
    profilePic: 'profile-pic-url-4.jpg'
  }
];

const Followers = () => {
  const [followers, setFollowers] = useState(followersData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id) => {
    setFollowers(followers.filter(follower => follower.id !== id));
  };

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <div className='text-black p-4'>
      <h1 className='text-3xl mb-4'>Followers</h1>

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
        {filteredFollowers.map(follower => (
          <li key={follower.id} className='flex items-center justify-between p-4 bg-white shadow rounded-lg'>
            <div className='flex items-center'>
              <img src={follower.profilePic} alt={`${follower.name}'s profile`} className='w-12 h-12 rounded-full' />
              <div className='ml-4'>
                <p className='font-semibold'>{follower.name}</p>
                <p className='text-sm text-gray-500'>{follower.industry}</p>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <button
                className='text-blue-500 border border-blue-500 p-2 rounded'
                onClick={() => handleViewProfile(follower)}
              >
                See Full Profile
              </button>
              <button
                className='text-red-500 border border-red-500 p-2 rounded'
                onClick={() => handleRemove(follower.id)}
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

export default Followers;
