'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

// Sample static following data
const followingData = [
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
    name: 'Frank Harris',
    industry: 'Finance',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s',
    about: 'Experienced financial analyst with expertise in market trends and investment strategies.',
    experience: '7 years in financial consulting and analysis.',
    skills: ['Financial Modeling', 'Investment Analysis', 'Risk Management']
  },
  {
    id: 3,
    name: 'Grace Lee',
    industry: 'Food',
    profilePic: 'https://www.nicesnippets.com/demo/following1.jpg',
    about: 'Food critic and blogger with a love for culinary arts and gastronomy.',
    experience: '10 years of experience in food critique and blogging.',
    skills: ['Food Criticism', 'Culinary Arts', 'Food Photography']
  },
  {
    id: 4,
    name: 'Henry Wilson',
    industry: 'Health',
    profilePic: 'https://www.live4india.com/images/users/6.jpg',
    about: 'Healthcare professional specializing in public health and wellness.',
    experience: '8 years in public health research and clinical practice.',
    skills: ['Public Health', 'Clinical Research', 'Wellness Coaching']
  }
];


const Following = () => {
  const [following, setFollowing] = useState(followingData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [targetPerson, setTargetPerson] = useState(null);
  // Example state declarations
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

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
  }, []);

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

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleUnfollow = (person) => {
    setTargetPerson(person);
    setShowUnfollowModal(true);
  };

  const handleReport = (person) => {
    setTargetPerson(person);
    setShowReportModal(true);
  };

  const handleBlock = (person) => {
    setTargetPerson(person);
    setShowBlockModal(true);
  };

  const closeModal = () => {
    setShowUnfollowModal(false);
    setShowReportModal(false);
    setShowBlockModal(false);
    setTargetPerson(null);
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
                  className='font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full  hover:scale-105 transition duration-200'
                  onClick={() => handleViewProfile(person)}
                >
                  See Full Profile
                </button>

                <div className='relative'>
                  <button
                    className='text-gray-400 hover:text-gray-600'
                    onClick={() => toggleMenu(person.id)}
                  >
                    <FaEllipsisV />
                  </button>

                  {openMenu === person.id && (
                    <div ref={menuRef} className='absolute right-0 mt-2 w-48 bg-[#fedeca] rounded-lg shadow-lg z-20'>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleUnfollow(person)}
                      >
                        Unfollow
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleReport(person)}
                      >
                        Report
                      </button>
                      <button
                        className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#fac9aa] rounded-lg'
                        onClick={() => handleBlock(person)}
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

        {/* Unfollow Modal */}
        {showUnfollowModal && targetPerson && (
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
              <p>Are you sure you want to unfollow {targetPerson.name}?</p>
              <div className='flex justify-end mt-4'>
                <button
                  className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-lg'
                  onClick={() => {
                    handleRemove(targetPerson.id);
                    closeModal();
                  }}
                >
                  Unfollow
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Modal */}
        {showReportModal && targetPerson && (
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
              <h2 className='text-xl font-semibold mb-4'>Why are you reporting this profile?</h2>
              <form>
                <div className='mb-4'>
                  <label className='flex items-center'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      onChange={(e) => setReason('Inappropriate Content')}
                      checked={reason === 'Inappropriate Content'}
                    />
                    Inappropriate Content
                  </label>
                  <label className='flex items-center mt-2'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      onChange={(e) => setReason('Spam')}
                      checked={reason === 'Spam'}
                    />
                    Spam
                  </label>
                  <label className='flex items-center mt-2'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      onChange={(e) => setReason('Harassment')}
                      checked={reason === 'Harassment'}
                    />
                    Harassment
                  </label>
                  <label className='flex items-center mt-2'>
                    <input
                      type='checkbox'
                      className='mr-2'
                      onChange={(e) => setReason('Others')}
                      checked={reason === 'Others'}
                    />
                    Others
                  </label>
                </div>
                {reason === 'Others' && (
                  <div className='mb-4'>
                    <textarea
                      className='w-full p-2 border rounded-lg'
                      placeholder='Please specify your reason...'
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                    ></textarea>
                  </div>
                )}
                <div className='flex justify-end mt-4'>
                  <button
                    type='button'
                    className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='px-4 py-2 bg-red-500 text-white rounded-lg'
                    onClick={() => {
                      const reportMessage = reason === 'Others' && otherReason ? `${targetPerson.name} reported for: ${otherReason}` : `${targetPerson.name} reported for: ${reason}`;
                      alert(reportMessage);
                      closeModal();
                    }}
                  >
                    Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}



        {/* Block Modal */}
        {showBlockModal && targetPerson && (
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
              <p>Are you sure you want to block {targetPerson.name}?</p>
              <div className='flex justify-end mt-4'>
                <button
                  className='px-4 py-2 bg-gray-300 rounded-lg mr-2'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-lg'
                  onClick={() => {
                    alert(`${targetPerson.name} blocked!`);
                    closeModal();
                  }}
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
          <p className='text-2xl font-semibold text-black'>{selectedProfile.name}</p>
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


    </>
  );
};

export default Following;
