'use client';

import React from 'react';
import MarketAnalysis from './options/MarketAnalysis';
import SocialMedia from './options/SocialMedia';
import SmartMatch from './options/SmartMatch';
import Followers from './options/Followers'
import Following from './options/Following'
import Chats from './options/Chats'
import Donations from './options/Donations'

const Window = ({ isMarketAnalysis, isSocialMedia, isSmartMatch, isFollowers, isFollowing, isChats, isDonations }) => {
  return (
    <div className='w-65 bg-white rounded-2xl h-101 bg-opacity-50 mb-6 mr-4 mt-24 p-4 '>
      {isMarketAnalysis && <MarketAnalysis />}
      <div className='flex justify-center'>
      {isSocialMedia && <SocialMedia />}</div>
      {isSmartMatch && <SmartMatch />}
      {isFollowers && <Followers />}
      {isFollowing && <Following />}
      {isChats && <Chats />}
      {isDonations && <Donations />}
    </div>
  );
};

export default Window;
