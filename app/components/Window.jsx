'use client';

import React from 'react';
// import MarketAnalysis from './MarketAnalysis';
import MarketAnalysis from './options/MarketAnalysis'
import SocialMedia from './options/SocialMedia'


const Window = ({ isMarketAnalysis, isSocialMedia }) => {
  return (
    <div className='w-65 bg-white rounded-2xl h-101 opacity-50 mb-6 mr-4 mt-24 p-4'>
      {isMarketAnalysis && <MarketAnalysis />}
      {/* {isSocialMedia && <SocialMedia />} */}
    </div>
  );
};

export default Window;
