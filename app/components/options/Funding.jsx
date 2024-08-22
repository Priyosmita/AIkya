'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './options.css'; // Ensure this file exists or use inline styles/Tailwind
import '../components.css';
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import axios from 'axios'; // Ensure axios is installed

// Sample data for funded startups
// Removed sample data as we will fetch it from the server

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
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleStep, setVisibleStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState({});




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

  useEffect(() => {
    // Fetch funding data from the server
    const fetchFundingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/funding'); // Adjust the API endpoint as needed
        setStartups(response.data);
      } catch (error) {
        console.error('Error fetching funding data:', error);
      }
    };

    fetchFundingData();
  }, []);

  const openAddModal = () => {
    setShowAddModal(true);
  };
  const handleMarkAsDone = (index) => {
    if (visibleStep < selectedStartup.roadmap.length - 1 && uploadedImages[index]) {
      setUploadedImages((prev) => ({
        ...prev,
        [`marked-${index}`]: true,
      }));
      setVisibleStep(visibleStep + 1);
    }
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev) => ({ ...prev, [index]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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

  const filteredfunds = startups.filter(startup =>
    startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    startup.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStartup = async () => {
    try {
      await axios.post('http://localhost:5000/api/funding', newStartup); // Adjust the API endpoint as needed
      const response = await axios.get('http://localhost:5000/api/funding'); // Refresh the funding data
      setStartups(response.data);
      closeAddModal();
    } catch (error) {
      console.error('Error adding startup:', error);
    }
  };

  const removeStartup = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/funding/${id}`); // Adjust the API endpoint as needed
      const response = await axios.get('http://localhost:5000/api/funding'); // Refresh the funding data
      setStartups(response.data);
    } catch (error) {
      console.error('Error removing startup:', error);
    }
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
        <div className='funding-container p-7 text-black overflow-y-auto h-106 custom-scrollbar'>
          {/* <button
          className="bg-green-500 text-white px-4 py-2 rounded-full mb-4"
          onClick={openAddModal}
        >
          Add New Startup
        </button> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto">
            {filteredfunds.map(startup => (
              <div key={startup._id} className="p-4 bg-white shadow-lg rounded-lg bg-opacity-50">
                <img
                  src={startup.image ? `http://localhost:5000/${startup.image}` : '/default-image.jpg'} // Use a default image if no image is available
                  alt={startup.title}
                  className="w-full h-64 object-cover mb-2 rounded"
                />
                <h3 className="text-xl font-semibold mb-2 text-center">{startup.title}</h3>
                <p className="mb-2 text-gray-600 text-center">{startup.description}</p>
                <div className='flex justify-center'>
                  <button
                    className="font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full hover:scale-105 transition duration-150 mr-2"
                    onClick={() => openFundingLogs(startup)}
                  >
                    Funds
                  </button>
                  <button
                    className="bg-[#f8b891] hover:bg-[#eda071] text-white px-4 py-1 rounded-full font-bold hover:scale-105 transition duration-150"
                    onClick={() => removeStartup(startup._id)}
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
                <IoCloseSharp />
              </button>
              <h3 className="font-semibold text-2xl text-[#378e8e] text-center mb-4">Funding Details for {selectedStartup.title}</h3>
              <div className="mb-4">
                <h4 className="text-2xl pb-4 font-semibold text-[#378e8e] text-center ">Roadmap</h4>

                <div className="overflow-y-auto max-h-[30vh] custom-scrollbar">
                  <ul className="list-none flex flex-col items-center">
                    {selectedStartup.roadmap.map((step, index) => (
                      index <= visibleStep && (
                        <li
                          key={index}
                          className="mb-2 w-full max-w-xs relative flex flex-col items-center"
                        >
                          <div className="bg-[#66b8b8] bg-opacity-30 border-2 border-[#7ebaba] p-4 rounded-md text-xl text-center w-full text-[#2c9999]">
                            <p className='font-semibold pb-5'>{step}</p>

                            <div className='flex justify-center'>
                              {uploadedImages[index] && (
                                <img
                                  src={uploadedImages[index]}
                                  alt={`Preview ${index}`}
                                  className="mt-2 mb-2 max-h-20"
                                />
                              )}
                            </div>

                            <div className='flex flex-col justify-center gap-y-5'>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, index)}
                                className="mt-4 mb-2 hidden"
                                id={`upload-proof-${index}`}
                              />
                              <label
                                htmlFor={`upload-proof-${index}`}
                                className="bg-[#7ebaba] text-white px-2 py-2 rounded-md cursor-pointer hover:bg-[#47b3b3] transition duration-200"
                              >
                                Upload Proof
                              </label>

                              <button
                                className="bg-[#ffd9c1] hover:bg-[#f1be9e] hover:text-white text-[#c07b51] py-1 px-2 rounded"
                                onClick={() => handleMarkAsDone(index)}
                                disabled={!uploadedImages[index]}
                              >
                                {uploadedImages[`marked-${index}`] ? 'Marked' : 'Mark as Done'}
                              </button>
                            </div>
                          </div>

                          {index !== selectedStartup.roadmap.length - 1 && (
                            <div className="h-2 w-1 bg-[#7ebaba] absolute left-1/2 transform -translate-x-1/2 top-full"></div>
                          )}
                        </li>
                      )
                    ))}
                  </ul>
                </div>

              </div>
              <div className="mb-4 pr-10">
                <h4 className="text-2xl text-center font-semibold text-[#378e8e] mb-4">Investors & Funding</h4>
                <ul className="list-none text-center">
                  {selectedStartup.investor_name.map((investor, index) => (
                    <li key={index} className="mb-2 text-xl text-[#379595] flex ">
                      <span className="font-semibold">{investor}</span>
                      <span className="mx-2">:</span>
                      <span>{selectedStartup.funds[index]} rs</span>
                    </li>
                  ))}
                </ul>
              </div>

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
