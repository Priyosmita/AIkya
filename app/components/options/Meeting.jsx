'use client'
import React, { useState } from 'react';
import VideoCallComponent from './VideoCallComponent';

const Meeting = ({ meetingId }) => {
  const [id, setId] = useState('');
  const [isHost, setIsHost] = useState(false);

  const handleJoin = () => {
    if (id === meetingId) {
      setIsHost(false);
    } else {
      alert('Invalid Meeting ID');
    }
  };

  return (
    <div>
      {isHost ? (
        <VideoCallComponent isHost={true} />
      ) : (
        <div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Meeting ID"
          />
          <button onClick={handleJoin}>Join</button>
          <VideoCallComponent isHost={false} />
        </div>
      )}
    </div>
  );
};

export default Meeting;
