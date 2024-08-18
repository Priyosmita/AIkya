'use client';

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./options.css"
import { FaSearch } from "react-icons/fa";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';


// Sample static chat data with demo messages
const chatsData = [
  {
    id: 1,
    name: 'Rijuraj Datta',
    profilePic: 'https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png',
    messages: [
      { text: 'Hello! How are you?', sender: 'user' },
      { text: 'Hi there! I am good, thanks for asking. How about you?', sender: 'Rijuraj Datta' },
      { text: 'I am doing well too. Just wanted to discuss our project.', sender: 'user' },
      { text: 'Sure, let’s go over the details.', sender: 'Rijuraj Datta' }
    ]
  },
  {
    id: 2,
    name: 'Bob Brown',
    profilePic: 'https://cambridgesmiles.ca/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750-1.jpg',
    messages: [
      { text: 'Good morning! Did you receive my email?', sender: 'user' },
      { text: 'Good morning! Yes, I received it. I will review it today.', sender: 'Bob Brown' },
      { text: 'Great! Let me know if you have any questions.', sender: 'user' },
      { text: 'Will do. Thanks!', sender: 'Bob Brown' }
    ]
  },
  {
    id: 3,
    name: 'Carol White',
    profilePic: 'https://img.freepik.com/photos-gratuite/gros-plan-belle-jeune-femme-brune-habillee-haut-raye-se-detendre-dans-pepiniere-pendant-journee-profiter-air-frais-concept-personnes-nature-verdure-agriculture-jardinage-fraicheur_343059-209.jpghttps://img.freepik.com/free-photo/portrait-happy-young-woman-looking-camera_23-2147892777.jpg',
    messages: [
      { text: 'Hi Carol, can we schedule a call?', sender: 'user' },
      { text: 'Hello! Yes, we can. What time works for you?', sender: 'Carol White' },
      { text: 'How about 3 PM today?', sender: 'user' },
      { text: 'That works for me. I will send you a calendar invite.', sender: 'Carol White' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },
  {
    id: 4,
    name: 'David Green',
    profilePic: 'https://www.qtrainers.com/upload/profile/160/2020/02/profile_35405e4683b309238.jpg',
    messages: [
      { text: 'Hi David, just following up on our last discussion.', sender: 'user' },
      { text: 'Hello! I’ve made some progress. Let’s discuss it.', sender: 'David Green' },
      { text: 'Looking forward to it. When would be a good time?', sender: 'user' },
      { text: 'How about tomorrow morning?', sender: 'David Green' }
    ]
  },


];

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReply, setSelectedReply] = useState(null);
  useEffect(() => {
    if (selectedChat) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [selectedChat]);


  const openChat = (chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  const closeChat = () => {
    setSelectedChat(null);
    setMessage('');
  };

  const handleSendMessage = (replyTo) => {
    const newMessage = {
      text: message,
      sender: 'user',
      replyTo: replyTo ? replyTo.text : null, // Include the text of the replied message if any
    };

    // Add the new message to the end of the messages array
    setMessages([...messages, newMessage]);
    setMessage(''); // Clear the input field
    setSelectedReply(null); // Clear the selected reply
  };



  // Filter chats based on search query
  const filteredChats = chatsData.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          className="shadow-lg pl-10 p-2 border rounded-full w-108"
        />
      </div>

      <div className='text-black pl-10 pr-10 pb-4  h-106 funding-container overflow-y-auto custom-scrollbar'>
        <ul className='space-y-4'>
          {filteredChats.map(chat => (
            <li key={chat.id} className='h-16 flex items-center justify-between p-4 bg-white bg-opacity-50 shadow-lg rounded-lg'>
              <div className='flex items-center'>
                <img src={chat.profilePic} alt={`${chat.name}'s profile`} className='w-12 h-12 rounded-full' />
                <div className='ml-4'>
                  <p className='font-semibold'>{chat.name}</p>
                </div>
              </div>
              <button
                className='bg-[#7ebaba] hover:bg-[#f8b891] font-bold hover:scale-110 transition duration-300 text-white px-4 py-1 rounded-full'
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
            className="fixed inset-0 flex flex-col items-center justify-center p-4 text-black mt-10"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
          >
            <div className="bg-[#fbe0d1] bg-opacity-95 p-4 rounded-lg shadow-lg w-full max-w-xl h-[80vh] flex flex-col relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeChat}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="flex items-center mb-4">
                <img src={selectedChat.profilePic} alt={`${selectedChat.name}'s profile`} className="w-16 h-16 rounded-full" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold">{selectedChat.name}</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow overflow-y-auto mb-4 border-b border-gray-200">
                {messages.map((msg, index) => (
                  <React.Fragment key={index}>
                    {/* Render the message being replied to if it exists */}
                    {msg.replyTo && (
                      <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className="flex items-center py-1">
                          {msg.sender !== 'user' && (
                            <img
                              src={selectedChat.profilePic}
                              alt={`${selectedChat.name}'s profile`}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          )}
                          <div className={`border-r-4 -mb-3 border-[#7ebaba]`}>
                            <div>
                              
                            <p className="px-3 rounded-full bg-[#d4eded] text-xs text-gray-600 mr-2 py-1 "> {msg.replyTo}</p></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Render the reply message */}
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`} onClick={() => setSelectedReply(msg)}>
                      <div className="flex items-center py-1">
                        {msg.sender !== 'user' && (
                          <img
                            src={selectedChat.profilePic}
                            alt={`${selectedChat.name}'s profile`}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                        )}
                        <div className={`py-2 px-3 rounded-full ${msg.sender === 'user' ? 'bg-[#7ebaba] text-white' : 'bg-white'}`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>



              {selectedReply && (
                <div className="bg-white p-2 mb-2 border-l-4 border-[#7ebaba]">
                  <p className="text-sm text-gray-600">Replying to: {selectedReply.text}</p>
                  <button
                    onClick={() => setSelectedReply(null)}
                    className="text-xs text-red-600"
                  >
                    Cancel Reply
                  </button>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="border border-gray-300 p-2 rounded-l-xl flex-grow text-black"
                />
                <button
                  onClick={() => handleSendMessage(selectedReply)}
                  className="bg-[#7ebaba] text-white p-2 rounded-r-lg"
                >
                  Send
                </button>
              </div>
            </div>
          </Modal>
        )}


      </div>
    </>
  );
};

export default Chats;
