'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./options.css"
import "../components.css"
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';

// Sample data for startups
const startupsData = [
  {
    id: 1,
    image: 'https://img.freepik.com/premium-photo/tech-devices-icons-connected-digital-planet-earth_117023-449.jpg',
    name: 'Tech Innovators',
    industry: 'Technology',
    details: 'Tech Innovators is working on cutting-edge AI solutions.',
    valuation: '$50M',
  },
  {
    id: 2,
    image: 'https://www.srepublic.in/uploads/images/2023/12/image_750x_656b1892b0b4f.jpg',
    name: 'Green Ventures',
    industry: 'Environmental',
    details: 'Green Ventures focuses on sustainable energy solutions.',
    valuation: '$30M',
  },
  {
    id: 3,
    image: 'https://www.mytechmag.com/wp-content/uploads/2022/07/healthcare-startups-1200x675.jpg',
    name: 'HealthNext',
    industry: 'Healthcare',
    details: 'HealthNext develops innovative health tech products.',
    valuation: '$80M',
  },
];

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    if (donationAmount) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [donationAmount]);

  useEffect(() => {
    if (showDonatePopup) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [showDonatePopup]);

  useEffect(() => {
    if (selectedStartup) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedStartup]);

  const filteredStartups = startupsData.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDetailsModal = (startup) => {
    setSelectedStartup(startup);
    setShowDonatePopup(false);  // Ensure donation popup is closed
  };

  const closeDetailsModal = () => {
    setSelectedStartup(null);
  };

  const openDonatePopup = (startup) => {
    setSelectedStartup(startup);
    setShowDonatePopup(true);
  };

  const closeDonatePopup = () => {
    setShowDonatePopup(false);
    setSelectedStartup(null);  // Clear selected startup when closing donate popup
  };

  const handleDonate = () => {
    // Handle donation logic here
    alert(`Donated $${donationAmount}`);
    setDonationAmount('');
    closeDonatePopup();
  };

  return (
    <>
      <div className='flex flex-col'>
        {/* Search Bar */}
        <div className="relative pr-2 pl-7 pt-4">
            <button className='pl-7 pt-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="shadow-lg pl-10 text-black p-2 border rounded-full w-108"
            />
          </div>
        <div className='donations-container pl-7 pr-4 pb-44 text-black flex justify-center flex-col h-106'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto custom-scrollbar">
            {filteredStartups.map(startup => (
              <div key={startup.id} className="p-4 bg-white shadow-lg rounded-lg bg-opacity-50">
                <img src={startup.image} alt={startup.name} className="w-full h-64 object-cover mb-2 rounded" />
                <h3 className="text-xl font-semibold mb-2 text-center">{startup.name}</h3>
                <p className="mb-2 text-gray-600 text-center">{startup.industry}</p>
                <div className='flex justify-center'>
                  <button
                    className="font-bold bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-1 rounded-full hover:scale-105 transition duration-150 mr-2"
                    onClick={() => openDonatePopup(startup)}
                  >
                    Donate
                  </button>
                  <button
                    className="bg-[#f8b891] hover:bg-[#eda071] text-white px-4 py-1 rounded-full font-bold hover:scale-105 transition duration-150"
                    onClick={() => openDetailsModal(startup)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Details Modal */}
          {selectedStartup && !showDonatePopup && (
            <Modal
              isOpen={!!selectedStartup}
              onRequestClose={closeDetailsModal}
              contentLabel="Details Modal"
              className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
            >
              <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl shadow-lg relative w-[90%] max-w-md custom-scrollbar">
                <button
                  className="absolute top-4 right-4 text-[#6bb3b3] text-2xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
                  onClick={closeDetailsModal}
                >
                  <IoCloseSharp />
                </button>
                <div className="flex items-center mb-4">
                  <img src={selectedStartup.image} alt={selectedStartup.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <p className="cursor-default font-semibold text-2xl text-[#378e8e]">{selectedStartup.name}</p>
                    <p className="cursor-default font-semibold text-xl text-[#378e8e]">{selectedStartup.industry}</p>
                  </div>
                </div>
                <p className="cursor-default mb-2 text-lg text-[#378e8e]">Details: {selectedStartup.details}</p>
                <p className="cursor-default text-lg text-[#378e8e]">Valuation: {selectedStartup.valuation}</p>
              </div>
            </Modal>
          )}

          {/* Donate Popup */}
          {showDonatePopup && (
            <Modal
              isOpen={showDonatePopup}
              onRequestClose={closeDonatePopup}
              contentLabel="Donate Popup"
              className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
              overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
            >
              <div className="bg-[#fedeca] bg-opacity-95 p-6 rounded-xl shadow-lg relative w-[90%] max-w-md overflow-auto custom-scrollbar">
                <button
                  className="absolute top-4 right-4 text-[#6bb3b3] text-2xl rounded-full transform transition duration-150 hover:text-[#1f6262]"
                  onClick={closeDonatePopup}
                >
                  <IoCloseSharp />
                </button>
                <h3 className="cursor-default font-semibold text-2xl text-[#378e8e] mb-4">Donate to {selectedStartup?.name}</h3>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mb-4 p-2 border rounded-xl w-full"
                />
                <div className='flex justify-center pt-2'>
                  <button
                    onClick={handleDonate}
                    className="font-bold text-lg bg-[#7ebaba] hover:bg-[#559393] text-white px-4 py-2 rounded-full hover:scale-105 transition duration-150"
                  >
                    Donate
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Donations;
