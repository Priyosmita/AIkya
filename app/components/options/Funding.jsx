'use client'

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './options.css'; // Ensure this file exists or use inline styles/Tailwind
import '../components.css'
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

// Sample data for funded startups
const fundedStartupsData = [
  {
    id: 1,
    image: 'https://i.pcmag.com/imagery/lineups/05eGqoRcVFRa6mqdHas610v-1.fit_lim.size_768x432.v1569492758.jpg',
    name: 'InnovateTech',
    industry: 'Technology',
    valuation: '$60M',
    fundingRequired: '$10M',
    description: 'InnovateTech is pioneering the future of AI and robotics.',
    fundingLogs: [
      { name: 'John Doe', amount: '$500K' },
      { name: 'Jane Smith', amount: '$1M' },
    ],
  },
];

const Funding = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStartup, setNewStartup] = useState({
    name: '',
    industry: '',
    valuation: '',
    image: '',
    fundingRequired: '',
    description: '',
  });
  const [startups, setStartups] = useState(fundedStartupsData);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedStartup) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedStartup]);

  useEffect(() => {
    // Required for react-modal
    Modal.setAppElement('body');
  }, []);

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setNewStartup({
      name: '',
      industry: '',
      valuation: '',
      image: '',
      fundingRequired: '',
      description: '',
    });
  };

  const filteredfunds = startups.filter(startups =>
    startups.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    startups.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStartup = () => {
    setStartups([...startups, { ...newStartup, id: startups.length + 1 }]);
    closeAddModal();
  };

  const removeStartup = (id) => {
    setStartups(startups.filter(startup => startup.id !== id));
  };

  const openFundingLogs = (startup) => {
    setSelectedStartup(startup);
  };

  const closeFundingLogs = () => {
    setSelectedStartup(null);
  };

  return (
    <>
    <div className='flex flex-col'>
      {/* Search Bar */}
      <div className="relative pl-7 pt-4">
        <button className='pl-7 pt-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search funds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-lg pl-10 text-black p-2 border rounded-full w-108"
        />
      </div>

      {/* Funds */}
      <div className='funding-container p-7 text-black overflow-y-auto h-106  custom-scrollbar'>
        {/* <button
        className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
        onClick={openAddModal}
      >
        Add New Startup
      </button> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto">
          {startups.map(startup => (
            <div key={startup.id} className="p-4 bg-white shadow-lg rounded-lg bg-opacity-50">
              <img src={startup.image} alt={startup.name} className="w-full h-64 object-cover mb-2 rounded" />
              <h3 className="text-xl font-semibold mb-2 text-center">{startup.name}</h3>
              <p className="mb-2 text-gray-600 text-center">{startup.industry}</p>
              <div className='flex justify-center'>
              <button
                className="font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full hover:scale-105 transition duration-150 mr-2"
                onClick={() => openFundingLogs(startup)}
              >
                Funds
              </button>
              <button
                className="bg-[#f8b891] hover:bg-[#eda071] text-white px-4 py-1 rounded-full font-bold hover:scale-105 transition duration-150"
                onClick={() => removeStartup(startup.id)}
              >
                Remove
              </button>
              </div>
            </div>
          ))}
        </div>
    </div>
      

        {/* Add Startup Modal */}
        <Modal
          isOpen={showAddModal}
          onRequestClose={closeAddModal}
          contentLabel="Add Startup Modal"
          className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto custom-scrollbar">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeAddModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 className="text-2xl font-semibold mb-4">Add New Startup</h3>
            <input
              type="text"
              placeholder="Startup Name"
              value={newStartup.name}
              onChange={(e) => setNewStartup({ ...newStartup, name: e.target.value })}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Industry"
              value={newStartup.industry}
              onChange={(e) => setNewStartup({ ...newStartup, industry: e.target.value })}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Valuation"
              value={newStartup.valuation}
              onChange={(e) => setNewStartup({ ...newStartup, valuation: e.target.value })}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="text"
              placeholder="Funding Required"
              value={newStartup.fundingRequired}
              onChange={(e) => setNewStartup({ ...newStartup, fundingRequired: e.target.value })}
              className="mb-4 p-2 border rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={newStartup.description}
              onChange={(e) => setNewStartup({ ...newStartup, description: e.target.value })}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="file"
              onChange={(e) => setNewStartup({ ...newStartup, image: URL.createObjectURL(e.target.files[0]) })}
              className="mb-4"
            />
            <button
              onClick={handleAddStartup}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </Modal>

        {/* Funding Logs Modal */}
        <Modal
          isOpen={!!selectedStartup}
          onRequestClose={closeFundingLogs}
          contentLabel="Funding Logs Modal"
          className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
          {selectedStartup ? (
            <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl shadow-lg relative w-[90%] max-w-md">
              <button
                className="absolute top-4 right-4 text-[#6bb3b3] text-2xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
                onClick={closeFundingLogs}
              >
                <IoCloseSharp/>
              </button>
              <h3 className="font-semibold text-2xl text-[#378e8e] text-center mb-4">Funding Logs for {selectedStartup.name}</h3>
              <ul className="list-disc pl-5 mb-4">
                {selectedStartup.fundingLogs.map((log, index) => (
                  <li key={index} className="mb-2">
                    <p className="cursor-default font-semibold text-xl text-[#378e8e]">{log.name}</p>
                    <p className="cursor-default text-xl text-[#378e8e]">{log.amount}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
              <p>No startup selected.</p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default Funding;
