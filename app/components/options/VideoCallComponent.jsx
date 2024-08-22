'use client'
import React, { useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

const VideoCallComponent = ({ isHost }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    const peer = new Peer({
      initiator: isHost,
      trickle: false,
      stream: null,
    });

    peerRef.current = peer;

    peer.on('signal', (data) => {
      socket.emit('signal', data);
    });

    socket.on('signal', (data) => {
      peer.signal(data);
    });

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        peer.on('stream', (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
        peerRef.current = peer;
      });

    return () => {
      peer.destroy();
    };
  }, [isHost]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted style={{ width: '45%' }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: '45%' }} />
    </div>
  );
};

export default VideoCallComponent;
