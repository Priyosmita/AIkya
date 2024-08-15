'use client'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './options.css'; // Ensure this file exists or use inline styles/Tailwind
import '../components.css'

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
  // Add other startup data here
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
    <div className='funding-container p-7 text-black SocialWidth'>
      {/* <button
        className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
        onClick={openAddModal}
      >
        Add New Startup
      </button> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto ml-20">
        {startups.map(startup => (
          <div key={startup.id} className="p-4 bg-white shadow-lg rounded-lg bg-opacity-30">
            <img src={startup.image} alt={startup.name} className="w-full h-64 object-cover mb-2 rounded" />
            <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
            <p className="mb-2 text-gray-600">{startup.industry}</p>
            <button
              className="bg-[#f8b891] hover:scale-110 transition duration-200 text-white px-4 py-2 rounded-full mr-2"
              onClick={() => removeStartup(startup.id)}
            >
              Remove
            </button>
            <button
              className="bg-[#7ebaba] hover:scale-110 transition duration-300 text-white px-4 py-2 rounded-full"
              onClick={() => openFundingLogs(startup)}
            >
              Funds
            </button>
          </div>
        ))}
      </div>

      {/* Add Startup Modal */}
      <Modal
        isOpen={showAddModal}
        onRequestClose={closeAddModal}
        contentLabel="Add Startup Modal"
        className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
      >
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeFundingLogs}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 className="text-2xl font-semibold mb-4">Funding Logs for {selectedStartup.name}</h3>
            <ul className="list-disc pl-5 mb-4">
              {selectedStartup.fundingLogs.map((log, index) => (
                <li key={index} className="mb-2">
                  <p className="font-semibold">{log.name}</p>
                  <p>{log.amount}</p>
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
  );
};

export default Funding;
