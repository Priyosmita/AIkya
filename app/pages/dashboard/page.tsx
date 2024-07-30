'use client'

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import Window from '@/app/components/Window';
import LeftSidebar from '@/app/components/LeftSidebar';

const DashboardPage: React.FC = () => {
  const [isMarketAnalysis, setIsMarketAnalysis] = useState(false);

  const handleMarketAnalysisClick = () => {
    setIsMarketAnalysis(true);
  };

  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-row'>
        <LeftSidebar onMarketAnalysisClick={handleMarketAnalysisClick} />
        <div className='flex-grow'>
          <Window isMarketAnalysis={isMarketAnalysis} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;