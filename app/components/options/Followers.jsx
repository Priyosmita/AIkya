'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

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
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (selectedProfile) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedProfile]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenMenu]);

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

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
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
          {filteredFollowers.map(follower => (
            <li key={follower.id} className='flex items-center justify-between h-16 p-4 bg-white shadow-lg rounded-lg bg-opacity-50'>
              <div className='flex items-center'>
                <img src={follower.profilePic} alt={`${follower.name}'s profile`} className='w-12 h-12 rounded-full' />
                <div className='ml-4'>
                  <p className='font-semibold'>{follower.name}</p>
                  <p className='text-sm text-gray-500'>{follower.industry}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <button
                  className='font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full hover:scale-105 transition duration-200'
                  onClick={() => handleViewProfile(follower)}
                >
                  See Full Profile
                </button>
                <div className='relative'>
                  <button
                    className='text-gray-400 hover:text-gray-600'
                    onClick={() => toggleMenu(follower.id)}
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenu === follower.id && (
                    <div ref={menuRef} className='absolute right-0 mt-2 w-48 bg-[#fedeca] rounded-lg shadow-lg z-20'>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleRemove(follower.id)}
                      >
                        Remove Follower
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => alert('Report follower?')}
                      >
                        Report
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => alert('Block follower?')}
                      >
                        Block
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

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

export default Followers;