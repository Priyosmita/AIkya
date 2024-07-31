'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';

const profiles = [
  {
    id: 1,
    photo: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
    name: 'John Doe',
    industry: 'Tech',
    tag: 'Entrepreneur',
    about: 'About John Doe',
    experience: '5 years in Tech industry',
    skills: 'JavaScript, React, Node.js'
  },
  {
    id: 2,
    photo: 'https://via.placeholder.com/150',
    name: 'Jane Smith',
    industry: 'Beauty',
    tag: 'Investor',
    about: 'About Jane Smith',
    experience: '10 years in Beauty industry',
    skills: 'Marketing, Sales, Product Development'
  },
  {
    id: 3,
    photo: 'https://via.placeholder.com/150',
    name: 'Alice Johnson',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Alice Johnson',
    experience: '7 years in Food industry',
    skills: 'Cooking, Recipe Development, Nutrition'
  },
  {
    id: 4,
    photo: 'https://via.placeholder.com/150',
    name: 'Bob Brown',
    industry: 'Tech',
    tag: 'Investor',
    about: 'About Bob Brown',
    experience: '15 years in Tech industry',
    skills: 'Investing, Startups, Venture Capital'
  },
  {
    id: 5,
    photo: 'https://via.placeholder.com/150',
    name: 'Carol White',
    industry: 'Tech',
    tag: 'Entrepreneur',
    about: 'About Carol White',
    experience: '3 years in Tech industry',
    skills: 'AI, Machine Learning, Data Science'
  },
  {
    id: 6,
    photo: 'https://via.placeholder.com/150',
    name: 'David Green',
    industry: 'Beauty',
    tag: 'Investor',
    about: 'About David Green',
    experience: '8 years in Beauty industry',
    skills: 'Brand Development, Public Relations'
  },
  {
    id: 7,
    photo: 'https://via.placeholder.com/150',
    name: 'Eve Black',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Eve Black',
    experience: '12 years in Food industry',
    skills: 'Restaurant Management, Culinary Arts'
  }
];

const SmartMatch = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [followStatus, setFollowStatus] = useState(
    profiles.reduce((acc, profile) => {
      acc[profile.id] = 'Follow';
      return acc;
    }, {})
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProfiles = profiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  const toggleFollow = (id) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [id]: prevStatus[id] === 'Follow' ? 'Following' : 'Follow'
    }));
  };

  return (
    <div className="p-4 max-h-screen overflow-y-auto">
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search by name or industry"
          className="p-2 border rounded w-full text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="p-4 border rounded-xl shadow bg-white text-black">
            <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
            <h3 className="text-xl text-center mb-1">{profile.name}</h3>
            <p className="text-center text-gray-600 mb-1">{profile.industry}</p>
            <p className="text-center text-gray-400 mb-2">{profile.tag}</p>
            <div className="flex justify-around">
              <button 
                onClick={() => openModal(profile)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                See Profile
              </button>
              <button 
                onClick={() => toggleFollow(profile.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {followStatus[profile.id]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProfile && (
        <Modal
          isOpen={!!selectedProfile}
          onRequestClose={closeModal}
          contentLabel="Profile Modal"
          className="fixed inset-0 flex items-center justify-center p-4 text-black"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded shadow max-w-lg w-full">
            <img src={selectedProfile.photo} alt={selectedProfile.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl text-center mb-4">{selectedProfile.name}</h2>
            <p className="text-center text-gray-600 mb-4">{selectedProfile.about}</p>
            <h3 className="text-xl mb-2">Experience</h3>
            <p className="mb-4">{selectedProfile.experience}</p>
            <h3 className="text-xl mb-2">Skills</h3>
            <p className="mb-4">{selectedProfile.skills}</p>
            <button 
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded block mx-auto"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SmartMatch;
