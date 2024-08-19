'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./options.css"
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch, FaEllipsisV } from "react-icons/fa";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

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
    photo: 'https://wildlifefilmnetwork.com/wp-content/uploads/pmpro-register-helper/Demo%20-%20Admin%20Page/Demo%20Page%20Profile%20Photo.jpg',
    name: 'Jane Smith',
    industry: 'Beauty',
    tag: 'Investor',
    about: 'About Jane Smith',
    experience: '10 years in Beauty industry',
    skills: 'Marketing, Sales, Product Development'
  },
  {
    id: 3,
    photo: 'https://organicthemes.com/demo/profile/files/2018/05/profile-pic.jpg',
    name: 'Alice Johnson',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Alice Johnson',
    experience: '7 years in Food industry',
    skills: 'Cooking, Recipe Development, Nutrition'
  },
  {
    id: 4,
    photo: 'https://cambridgesmiles.ca/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750-1.jpg',
    name: 'Bob Brown',
    industry: 'Tech',
    tag: 'Investor',
    about: 'About Bob Brown',
    experience: '15 years in Tech industry',
    skills: 'Investing, Startups, Venture Capital'
  },
];


const SmartMatch = () => {
  const [profileList, setProfileList] = useState(profiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [followStatus, setFollowStatus] = useState(
    profiles.reduce((acc, profile) => {
      acc[profile.id] = 'Follow';
      return acc;
    }, {})
  );
  const [blockedProfiles, setBlockedProfiles] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [profileToBlock, setProfileToBlock] = useState(null);


  useEffect(() => {
    if (selectedProfile) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedProfile]);

  const filteredProfiles = profiles.filter(profile =>
    (profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.industry.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filter === 'All' || profile.tag === filter) &&
    !blockedProfiles[profile.id]
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


  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id);
  };


  const removeProfile = (id) => {
    setProfileList(profileList.filter(profile => profile.id !== id));
    setMenuOpen(null);
  };


  const blockProfile = (profile) => {
    setProfileToBlock(profile);
    setMenuOpen(null);
    setShowBlockModal(true);
  };
  const confirmBlock = () => {
    if (profileToBlock) {
      setBlockedProfiles((prevStatus) => ({
        ...prevStatus,
        [profileToBlock.id]: true
      }));
      setProfileToBlock(null);
      setShowBlockModal(false);
    }
  };


  const openReportModal = () => {
    setReportModalOpen(true);
    setMenuOpen(null);
  };


  const closeReportModal = () => {
    setReportModalOpen(false);
    setReportReason('');
    setShowTextArea(false);
  };


  const handleReportSubmit = () => {
    alert('Your report has been submitted successfully');
    closeReportModal();
  };
  


  return (
    <>
      <div className="flex ">
        {/* Search bar */}
        <div className="relative pl-11 pb-7 pt-4">
          <button
            className='pl-11 pt-4 pb-7 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          >
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow-lg pl-10 text-black p-2 border rounded-full w-110"
          />
        </div>
        {/* Filtering */}
        <select
          className="p-2 mb-3 mt-4 ml-7 border flex items-center shadow-lg rounded-full text-gray-800 h-10"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="text-gray-00" value="All">All</option>
          <option className="text-gray-800" value="Entrepreneur">Entrepreneur</option>
          <option className="text-gray-800" value="Investor">Investor</option>
        </select>
      </div>

      <div className="text-black pl-10 pr-10 pb-4 h-106 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="relative p-4 border shadow-lg rounded-xl bg-opacity-30 bg-white text-black">
              <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
              <h3 className="text-xl text-center mb-1">{profile.name}</h3>
              <p className="text-center text-gray-600 mb-1">{profile.industry}</p>
              <p className="text-center text-gray-400 mb-2">{profile.tag}</p>
              <div className="flex justify-around">
                <button
                  onClick={() => openModal(profile)}
                  className="bg-[#f8b891] hover:bg-[#eda071] text-white px-4 py-1 rounded-full font-bold hover:scale-105 transition duration-150"
                >
                  See Profile
                </button>
                <button
                  onClick={() => toggleFollow(profile.id)}
                  className="font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full hover:scale-105 transition duration-150"
                >
                  {followStatus[profile.id]}
                </button>
              </div>

              {/* 3 dots */}
              <div className="absolute top-2 right-2">
                <button onClick={() => toggleMenu(profile.id)} className="text-gray-400 hover:text-gray-600 transition duration-100">
                  <FaEllipsisV />
                </button>
                {menuOpen === profile.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-[#fedeca] rounded-lg shadow-lg">
                    <button
                      onClick={() => blockProfile(profile)}
                      className="block px-4 py-2 text-sm text-left w-full text-gray-700 hover:bg-[#fac9aa] rounded-lg"
                    >
                      {blockedProfiles[profile.id] ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={openReportModal}
                      className="block px-4 py-2 text-sm text-left w-full text-gray-700 hover:bg-[#fac9aa] rounded-lg"
                    >
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Profile view modal */}
        {selectedProfile && (
          <Modal
            isOpen={!!selectedProfile}
            onRequestClose={closeModal}
            contentLabel="Profile Modal"
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
          >
            <div className='relative bg-[#fedeca] bg-opacity-95 p-8 rounded-xl shadow-lg w-[90%] max-w-2xl h-auto'>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-[#6bb3b3] text-3xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
              >
                <IoCloseSharp />
              </button>
              <div className='flex items-center mb-4'>
                <img src={selectedProfile.photo} alt={selectedProfile.name} className='w-32 h-32 rounded-full' />
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
                  {selectedProfile.skills.split(', ').map((skill, index) => (
                    <span key={index} className='bg-[#6bb3b3] text-white px-3 py-1 rounded-full text-sm'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}

        
        {/* Report Modal */}
        {reportModalOpen && (
          <Modal
            isOpen={reportModalOpen}
            onRequestClose={closeReportModal}
            contentLabel="Report Modal"
            className="fixed inset-0 flex items-center justify-center p-4 text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-[#fedeca] bg-opacity-90 p-6 rounded-xl shadow-lg relative w-[90%] max-w-md">
              <button
                className="absolute top-4 right-4 text-2xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110"
                onClick={() => {
                  closeReportModal(true);
                  setReportReason('');  // Reset selected reason
                }}
              >
                <IoCloseSharp />
              </button>
              <h3 className="font-semibold text-2xl text-[#378e8e] pt-4 pb-4">Why are you reporting this account?</h3>
              <div className='space-y-4'>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Inappropriate Content"
                    checked={reportReason === 'Inappropriate Content'}
                    onChange={(e) => setReportReason(e.target.value)}
                    className='mr-2'
                  />
                  Inappropriate Content
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Spam"
                    checked={reportReason === 'Spam'}
                    onChange={(e) => setReportReason(e.target.value)}
                    className='mr-2'
                  />
                  Spam
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Harassment"
                    checked={reportReason === 'Harassment'}
                    onChange={(e) => setReportReason(e.target.value)}
                    className='mr-2'
                  />
                  Harassment
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    checked={reportReason === 'Other' || showTextArea}
                    onChange={(e) => {
                      setReportReason(e.target.checked ? 'Other' : '');
                      setShowTextArea(e.target.checked);
                    }}
                    className="mr-2"
                  />
                  Other
                </label>
                {showTextArea && (
                  <textarea
                    className="border rounded w-full p-2"
                    placeholder="Please specify"
                    value={reportReason === 'Other' ? '' : reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                )}

              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleReportSubmit}
                  className="text-white bg-[#df7676] hover:bg-[#c75757] transform transition duration-150 rounded-full px-4 py-2"
                >
                  Report
                </button>
              </div>
            </div>
          </Modal>
          
        )}

        {/* Block Modal */}
        {showBlockModal && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='relative bg-[#fedeca] bg-opacity-90 p-6 rounded-xl shadow-lg w-[90%] max-w-md'>
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
                  onClick={confirmBlock}
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default SmartMatch;