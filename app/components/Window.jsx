'use client';

import React from 'react';
import MarketAnalysis from './options/MarketAnalysis';
import SocialMedia from './options/SocialMedia';
import SmartMatch from './options/SmartMatch';
import Followers from './options/Followers'
import Following from './options/Following'
import Chats from './options/Chats'
import Donations from './options/Donations'
import Funding from './options/Funding'
import './components.css'

const Window = ({ isMarketAnalysis, isSocialMedia, isSmartMatch, isFollowers, isFollowing, isChats, isDonations, isFunding}) => {
  return (
    <div className='WindowWidth bg-white rounded-2xl h-101 bg-opacity-50 mr-4 mt-24 p-4 '>
      {isMarketAnalysis && <MarketAnalysis />}
      <div className='flex justify-center'>
        {isSocialMedia && <SocialMedia />}</div>
      {isSmartMatch && <SmartMatch />}
      {isFollowers && <Followers />}
      {isFollowing && <Following />}
      {isChats && <Chats />}
      <div className='flex justify-center'>
        {isDonations && <Donations />}
        {isFunding && <Funding />}
      </div>
    </div>
  );
};

export default Window;