'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';

// Sample static chat data
const chatsData = [
  {
    id: 1,
    name: 'Alice Johnson',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
  },
  {
    id: 2,
    name: 'Bob Brown',
    profilePic: 'profile-pic-url-2.jpg'
  },
  {
    id: 3,
    name: 'Carol White',
    profilePic: 'profile-pic-url-3.jpg'
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'profile-pic-url-4.jpg'
  }
];

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const openChat = (chat) => {
    setSelectedChat(chat);
    setMessages([]);
  };

  const closeChat = () => {
    setSelectedChat(null);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  // Filter chats based on search query
  const filteredChats = chatsData.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='text-black'>
      <h1 className='text-3xl mb-4'>Chats</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search chats..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
      />

      <ul className='space-y-4'>
        {filteredChats.map(chat => (
          <li key={chat.id} className='flex items-center justify-between p-4 bg-white shadow rounded-lg'>
            <div className='flex items-center'>
              <img src={chat.profilePic} alt={`${chat.name}'s profile`} className='w-12 h-12 rounded-full' />
              <div className='ml-4'>
                <p className='font-semibold'>{chat.name}</p>
              </div>
            </div>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={() => openChat(chat)}
            >
              Chat
            </button>
          </li>
        ))}
      </ul>

      {/* Chat Popup */}
      {selectedChat && (
        <Modal
          isOpen={!!selectedChat}
          onRequestClose={closeChat}
          contentLabel="Chat Modal"
          className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={closeChat}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="flex items-center mb-4">
              <img src={selectedChat.profilePic} alt={`${selectedChat.name}'s profile`} className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <p className="text-xl font-semibold">{selectedChat.name}</p>
              </div>
            </div>
            <div className="flex flex-col h-64 overflow-y-auto mb-4 border-b border-gray-200">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="border border-gray-300 p-2 rounded-l-lg flex-grow text-black"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Chats;
