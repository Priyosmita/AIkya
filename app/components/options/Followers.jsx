'use client';

import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

// Sample static follower data
const followersData = [
  {
    id: 1,
    name: 'Rijuraj Datta',
    industry: 'Tech',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png'
  },
  {
    id: 2,
    name: 'Priyosmita Das',
    industry: 'Finance',
    profilePic: 'https://media.licdn.com/dms/image/D4E03AQF994QfoNMUBA/profile-displayphoto-shrink_200_200/0/1706964303726?e=2147483647&v=beta&t=kvqaovcfqEGsj35xJaAo6o6MSmvuvn_mThbzHTFyy3U'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg'
  },
  {
    id: 4,
    name: 'David Green',
    industry: 'Health',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg'
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
    <div className='text-black p-10 h-104'>

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
          className="shadow-lg pl-10 p-2 border rounded-full w-108"
        />
      </div>

      <ul className='space-y-4'>
        {filteredFollowers.map(follower => (
          <li key={follower.id} className='flex items-center justify-between p-4 bg-white shadow-lg rounded-lg bg-opacity-50'>
            <div className='flex items-center'>
              <img src={follower.profilePic} alt={`${follower.name}'s profile`} className='w-12 h-12 rounded-full' />
              <div className='ml-4'>
                <p className='font-semibold'>{follower.name}</p>
                <p className='text-sm text-gray-500'>{follower.industry}</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <button
                className='font-bold bg-[#7ebaba] hover:bg-[#6cbaba] text-white px-4 py-2 rounded-full hover:scale-110 transition duration-200'
                onClick={() => handleViewProfile(follower)}
              >
                See Full Profile
              </button>
              <button
                className='bg-[#f8b891] text-white px-4 py-2 rounded-full  font-bold hover:scale-110 transition duration-200'
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
          <div className='bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-3xl'>
            <div className='flex items-center mb-6'>
              <img src={selectedProfile.profilePic} alt={`${selectedProfile.name}'s profile`} className='w-32 h-32 rounded-full' />
              <div className='ml-4'>
                <p className='text-2xl font-semibold'>{selectedProfile.name}</p>
                <p className='text-lg text-gray-500'>{selectedProfile.industry}</p>
              </div>
            </div>
            <p className='text-gray-700'>
              <p className='font-medium'>Industry: {selectedProfile.industry}</p>
              <p className='mt-2'>About: A {selectedProfile.industry} enthusiast.</p>
            </p>
            <button
              className='mt-6 bg-[#7ebaba] hover:bg-[#6cbaba] hover:scale-110 transition duration-300 text-white border border-blue-500 p-3 rounded'
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
