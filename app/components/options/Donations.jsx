'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import "./options.css"
import "../components.css"

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
  {
    id: 4,
    image: 'https://www.avanse.com/blogs/images/10feb-blog-2023.jpg',
    name: 'EduTech',
    industry: 'Education',
    details: 'EduTech offers advanced e-learning solutions.',
    valuation: '$20M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
  {
    id: 5,
    image: 'https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg',
    name: 'FoodFuture',
    industry: 'Food',
    details: 'FoodFuture is creating sustainable food production technologies.',
    valuation: '$40M',
  },
];

const Donations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');

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
    <div className='donations-container p-4 text-black SocialWidth flex justify-center flex-col ml-20 items-center'>
      <input
        type="text"
        placeholder="Search startups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {filteredStartups.map(startup => (
          <div key={startup.id} className="p-4 bg-white shadow-lg rounded-lg bg-opacity-30">
            <img src={startup.image} alt={startup.name} className="w-full h-64 object-cover mb-2 rounded" />
            <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
            <p className="mb-2 text-gray-600">{startup.industry}</p>
            <button
              className="bg-[#7ebaba] hover:scale-110 transition duration-300 text-white px-4 py-2 rounded-full mr-2"
              onClick={() => openDonatePopup(startup)}
            >
              Donate
            </button>
            <button
              className="bg-[#f8b891] hover:scale-110 transition duration-300 text-white px-4 py-2 rounded-full"
              onClick={() => openDetailsModal(startup)}
            >
              View Details
            </button>
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeDetailsModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="flex items-center mb-4">
              <img src={selectedStartup.image} alt={selectedStartup.name} className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <p className="text-xl font-semibold">{selectedStartup.name}</p>
                <p className="text-gray-600">{selectedStartup.industry}</p>
              </div>
            </div>
            <p className="mb-2">Details: {selectedStartup.details}</p>
            <p>Valuation: {selectedStartup.valuation}</p>
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative max-h-[80vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeDonatePopup}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h3 className="text-2xl font-semibold mb-4">Donate to {selectedStartup?.name}</h3>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount"
              className="mb-4 p-2 border rounded w-full"
            />
            <button
              onClick={handleDonate}
              className="bg-[#7ebaba] hover:scale-110 transition duration-300 text-white px-4 py-2 rounded"
            >
              Donate
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Donations;
