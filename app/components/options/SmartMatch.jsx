
'use client';


import React, { useState } from 'react';
import Modal from 'react-modal';
import "./options.css"
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch, FaEllipsisV } from "react-icons/fa";




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
  {
    id: 5,
    photo: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpghttps://img.freepik.com/free-photo/portrait-happy-young-woman-looking-camera_23-2147892777.jpg',
    name: 'Carol White',
    industry: 'Tech',
    tag: 'Entrepreneur',
    about: 'About Carol White',
    experience: '3 years in Tech industry',
    skills: 'AI, Machine Learning, Data Science'
  },
  {
    id: 6,
    photo: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    name: 'David Green',
    industry: 'Beauty',
    tag: 'Investor',
    about: 'About David Green',
    experience: '8 years in Beauty industry',
    skills: 'Brand Development, Public Relations'
  },
  {
    id: 7,
    photo: 'https://qph.cf2.quoracdn.net/main-thumb-2013309591-200-freawasztvjtwggymlgduhmjkdgrklkh.jpeg',
    name: 'Eve Black',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Eve Black',
    experience: '12 years in Food industry',
    skills: 'Restaurant Management, Culinary Arts'
  },
  {
    id: 7,
    photo: 'https://qph.cf2.quoracdn.net/main-thumb-2013309591-200-freawasztvjtwggymlgduhmjkdgrklkh.jpeg',
    name: 'Eve Black',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Eve Black',
    experience: '12 years in Food industry',
    skills: 'Restaurant Management, Culinary Arts'
  },
  {
    id: 7,
    photo: 'https://qph.cf2.quoracdn.net/main-thumb-2013309591-200-freawasztvjtwggymlgduhmjkdgrklkh.jpeg',
    name: 'Eve Black',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Eve Black',
    experience: '12 years in Food industry',
    skills: 'Restaurant Management, Culinary Arts'
  },
  {
    id: 7,
    photo: 'https://qph.cf2.quoracdn.net/main-thumb-2013309591-200-freawasztvjtwggymlgduhmjkdgrklkh.jpeg',
    name: 'Eve Black',
    industry: 'Food',
    tag: 'Entrepreneur',
    about: 'About Eve Black',
    experience: '12 years in Food industry',
    skills: 'Restaurant Management, Culinary Arts'
  }
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


  const blockProfile = (id) => {
    setBlockedProfiles((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id]
    }));
    setMenuOpen(null);
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
    <><div className="flex items-center">
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
      <select
        className="p-2 mb-3 border rounded-full text-black h-10"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Entrepreneur">Entrepreneur</option>
        <option value="Investor">Investor</option>
      </select>
    </div>
      <div className="text-black pl-10 pr-10 pb-4 h-106 overflow-y-auto custom-scrollbar">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="relative p-4 border rounded-xl bg-opacity-30 shadow-lg bg-white text-black">
              <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
              <h3 className="text-xl text-center mb-1">{profile.name}</h3>
              <p className="text-center text-gray-600 mb-1">{profile.industry}</p>
              <p className="text-center text-gray-400 mb-2">{profile.tag}</p>
              <div className="flex justify-around">
                <button
                  onClick={() => openModal(profile)}
                  className="bg-[#f8b891] text-white px-4 py-2 rounded-full font-bold hover:scale-110 transition duration-300"
                >
                  See Profile
                </button>
                <button
                  onClick={() => toggleFollow(profile.id)}
                  className="font-bold bg-[#7ebaba] hover:bg-[#6cbaba] text-white px-4 py-2 rounded-full hover:scale-110 transition duration-300"
                >
                  {followStatus[profile.id]}
                </button>
              </div>
              <div className="absolute top-2 right-2">
                <button onClick={() => toggleMenu(profile.id)} className="focus:outline-none">
                  &#x22EE;
                </button>
                {menuOpen === profile.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                    <button
                      onClick={() => blockProfile(profile.id)}
                      className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-200"
                    >
                      {blockedProfiles[profile.id] ? 'Unblock' : 'Block'}
                    </button>
                    <button
                      onClick={openReportModal}
                      className="block px-4 py-2 text-sm text-left w-full hover:bg-gray-200"
                    >
                      Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>


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



        {reportModalOpen && (
          <Modal
            isOpen={reportModalOpen}
            onRequestClose={closeReportModal}
            contentLabel="Report Modal"
            className="fixed inset-0 flex items-center justify-center p-4 text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          >
            <div className="bg-white p-6 rounded shadow max-w-lg w-full">
              <h2 className="text-2xl mb-4">Report Profile</h2>
              <p className="mb-2">Why are you reporting this profile?</p>
              <div>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    value="Inappropriate Content"
                    checked={reportReason === 'Inappropriate Content'}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  Inappropriate Content
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    value="Spam"
                    checked={reportReason === 'Spam'}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  Spam
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    value="Harassment"
                    checked={reportReason === 'Harassment'}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  Harassment
                </label>
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    value="Other"
                    checked={reportReason === 'Other'}
                    onChange={(e) => {
                      setReportReason(e.target.value);
                      setShowTextArea(e.target.checked);
                    }}
                  />
                  Other
                </label>
                {showTextArea && (
                  <textarea
                    className="border rounded w-full p-2"
                    placeholder="Please explain..."

                    onChange={(e) => setReportReason(e.target.value)}
                  />
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeReportModal}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReportSubmit}
                  className="bg-[#7ebaba] text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};


export default SmartMatch;
