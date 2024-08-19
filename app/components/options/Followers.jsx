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
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
    about: 'Passionate tech enthusiast with a focus on AI and software development.',
    experience: '5 years in software engineering at various tech companies.',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: 2,
    name: 'Priyosmita Das',
    industry: 'Finance',
    profilePic: 'https://media.licdn.com/dms/image/D4E03AQF994QfoNMUBA/profile-displayphoto-shrink_200_200/0/1706964303726?e=2147483647&v=beta&t=kvqaovcfqEGsj35xJaAo6o6MSmvuvn_mThbzHTFyy3U',
    about: 'Financial analyst with extensive experience in investment and risk management.',
    experience: '7 years in financial consulting and analysis.',
    skills: ['Financial Modeling', 'Investment Analysis', 'Risk Management']
  },
  {
    id: 3,
    name: 'Carol White',
    industry: 'Food',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpg',
    about: 'Food critic and blogger with a love for culinary arts and gastronomy.',
    experience: '10 years of experience in food critique and blogging.',
    skills: ['Food Criticism', 'Culinary Arts', 'Food Photography']
  },
  {
    id: 4,
    name: 'David Green',
    industry: 'Health',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    about: 'Healthcare professional specializing in public health and wellness.',
    experience: '8 years in public health research and clinical practice.',
    skills: ['Public Health', 'Clinical Research', 'Wellness Coaching']
  }
];


const Followers = () => {
  const [followers, setFollowers] = useState(followersData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedFollowerId, setSelectedFollowerId] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [showRemoveFollowerModal, setShowRemoveFollowerModal] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (selectedProfile, showReportModal) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedProfile, showReportModal]);

  useEffect(() => {
    if (showBlockModal) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [showBlockModal]);
  useEffect(() => {
    if (showRemoveFollowerModal) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [showRemoveFollowerModal]);

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

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setSelectedReason(prev => prev === value ? '' : value);
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleReport = (id) => {
    setSelectedFollowerId(id);
    setShowReportModal(true);
  };

  const handleBlock = (id) => {
    setSelectedFollowerId(id);
    setShowBlockModal(true);
  };

  const handleRemoveFollower = (id) => {
    setSelectedFollowerId(id);
    setShowRemoveFollowerModal(true);
  };
  const confirmRemoveFollower = () => {
    setFollowers(followers.filter(follower => follower.id !== selectedFollowerId));
    setShowRemoveFollowerModal(false);
  };



  return (
    <>
      {/* Search Bar */}
      <div className="relative pl-9 pb-7 pt-4">
        <button className='pl-9 pt-4 pb-7 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search followers..."
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
                        onClick={() => handleRemoveFollower(follower.id)}
                      >
                        Remove Follower
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleReport(follower.id)}
                      >
                        Report
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleBlock(follower.id)}
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
                  <p className='text-lg text-gray-600'>{selectedProfile.industry}</p>
                </div>
              </div>
              <p className='text-gray-800 mb-2'>
                <span className='font-semibold'>About:</span> {selectedProfile.about}
              </p>
              <p className='text-gray-800 mb-2'>
                <span className='font-semibold'>Experience:</span> {selectedProfile.experience}
              </p>
              <div className='text-gray-800'>
                <span className='font-semibold'>Skills:</span>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {selectedProfile.skills.map((skill, index) => (
                    <span key={index} className='bg-[#6bb3b3] text-white px-3 py-1 rounded-full text-sm'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Report Modal */}
        {showReportModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='bg-[#fedeca] bg-opacity-85 p-6 rounded-xl shadow-lg relative w-[90%] max-w-md'>
              <button
                className="absolute top-4 right-4 text-2xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110"
                onClick={() => {
                  setShowReportModal(false);
                  setSelectedReason('');  // Reset selected reason
                  setOtherReason('');     // Reset other reason
                }}
              >
                <IoCloseSharp />
              </button>
              <h3 className='font-semibold text-2xl text-[#378e8e] pt-4 pb-4'>Why are you reporting this account?</h3>
              <div className='space-y-4'>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    value="Inappropriate content"
                    checked={selectedReason === 'Inappropriate content'}
                    onChange={handleReasonChange}
                    className='mr-2'
                  />
                  Inappropriate content
                </label>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    value="Spam"
                    checked={selectedReason === 'Spam'}
                    onChange={handleReasonChange}
                    className='mr-2'
                  />
                  Spam
                </label>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    value="Harassment"
                    checked={selectedReason === 'Harassment'}
                    onChange={handleReasonChange}
                    className='mr-2'
                  />
                  Harassment
                </label>
                <label className='flex items-center'>
                  <input
                    type="checkbox"
                    value="Others"
                    checked={selectedReason === 'Others'}
                    onChange={handleReasonChange}
                    className='mr-2'
                  />
                  Others
                </label>
                {selectedReason === 'Others' && (
                  <textarea
                    placeholder='Please specify'
                    value={otherReason}
                    onChange={handleOtherReasonChange}
                    className='w-full p-2 border rounded'
                  />
                )}
              </div>

              <div className='flex justify-center'>
                <button
                  className='mt-4 px-4 py-2 text-white bg-[#df7676] hover:bg-[#c75757] transform transition duration-150 rounded-full'
                  onClick={() => {
                    // Handle reporting logic
                    console.log(`Reported user ID ${selectedFollowerId} for reason: ${selectedReason}. Additional details: ${otherReason}`);

                    // Show alert after submitting the report
                    alert('Report submitted');

                    // Close the modal and reset state
                    setShowReportModal(false);
                    setSelectedReason('');  // Reset selected reason
                    setOtherReason('');     // Reset other reason
                  }}
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Block Modal */}
        {showBlockModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='relative bg-[#fedeca] bg-opacity-85 p-6 rounded-xl shadow-lg w-[90%] max-w-md'>
              <button
                className="absolute top-4 right-4 text-2xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110"
                onClick={() => setShowBlockModal(false)}
              >
                <IoCloseSharp />
              </button>
              <h3 className='flex justify-center font-semibold text-2xl text-[#378e8e] mb-2'>Block this user</h3>
              <p className='text-center text-lg text-[#378e8e] mb-4'>Are you sure you want to block this user? You will no longer see their posts and they will not be able to interact with you.</p>
              <div className='flex justify-center'>
                <button
                  className='text-white bg-[#df7676] hover:bg-[#c75757] transform transition duration-150 rounded-full px-4 py-2'
                  onClick={() => {
                    // Handle blocking logic
                    console.log(`Blocked user ID ${selectedFollowerId}`);
                    setShowBlockModal(false);
                  }}
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Removefollower modal */}
        {showRemoveFollowerModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='relative bg-[#fedeca] bg-opacity-85 p-6 rounded-xl shadow-lg w-[90%] max-w-md'>
              <button
                className="absolute top-4 right-4 text-2xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110"
                onClick={() => setShowRemoveFollowerModal(false)}
              >
                <IoCloseSharp />
              </button>
              <h3 className='flex justify-center font-semibold text-2xl text-[#378e8e] mb-2'>Remove this follower</h3>
              <p className='text-center text-lg text-[#378e8e] mb-4'>Are you sure you want to remove this follower? They will no longer see your posts and will be unfollowed.</p>
              <div className='flex justify-center'>
                <button
                  className='text-white bg-[#df7676] hover:bg-[#c75757] transform transition duration-150 rounded-full px-4 py-2'
                  onClick={confirmRemoveFollower}
                >
                  Remove Follower
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default Followers;

