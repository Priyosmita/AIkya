'use client'
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import Window from '@/app/components/Window';
import LeftSidebar from '@/app/components/LeftSidebar';

const DashboardPage= () => {
  const [isMarketAnalysis, setIsMarketAnalysis] = useState(false);
  const [isSocialMedia, setIsSocialMedia] = useState(false);
  const [isSmartMatch, setIsSmartMatch] = useState(false);
  const [isFollowers, setIsFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isChats, setIsChats] = useState(false);
  

  const handleMarketAnalysisClick = () => {
    setIsMarketAnalysis(true);
    setIsSocialMedia(false);
    setIsSmartMatch(false);
    setIsFollowers(false);
    setIsFollowing(false);
    setIsChats(false);
     // Ensure other components are not shown when MarketAnalysis is clicked
  };

  const handleSocialMediaClick = () => {
    setIsSocialMedia(true);
    setIsMarketAnalysis(false);
    setIsSmartMatch(false);
    setIsFollowers(false);
    setIsFollowing(false);
    setIsChats(false);
     // Ensure other components are not shown when SocialMedia is clicked
  };

  const handleSmartMatchClick = () => {
    setIsSmartMatch(true);
    setIsMarketAnalysis(false);
    setIsSocialMedia(false);
    setIsFollowers(false);
    setIsFollowing(false);
    setIsChats(false);
     // Ensure other components are not shown when SmartMatch is clicked
  };

  const handleFollowersClick = () => {
    setIsFollowers(true);
    setIsMarketAnalysis(false);
    setIsSocialMedia(false);
    setIsSmartMatch(false);
    setIsFollowing(false);
    setIsChats(false);
     // Ensure other components are not shown when Followers is clicked
  };
  const handleFollowingClick = () => {
    setIsFollowing(true);
    setIsFollowers(false);
    setIsMarketAnalysis(false);
    setIsSocialMedia(false);
    setIsSmartMatch(false);
    setIsChats(false);
    
     // Ensure other components are not shown when Followers is clicked
  };
  const handleChatsClick = () => {
    setIsChats(true);
    setIsFollowing(false);
    setIsFollowers(false);
    setIsMarketAnalysis(false);
    setIsSocialMedia(false);
    setIsSmartMatch(false);
    
    
     // Ensure other components are not shown when Followers is clicked
  };

  

  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-row'>
        <LeftSidebar 
          onMarketAnalysisClick={handleMarketAnalysisClick} 
          onSocialMediaClick={handleSocialMediaClick} 
          onSmartMatchClick={handleSmartMatchClick}
          onFollowersClick={handleFollowersClick} // Add onFollowersClick prop
          onFollowingClick={handleFollowingClick} // Add onFollowersClick prop
          onChatsClick={handleChatsClick} // Add onFollowersClick prop
        />
        <div className='flex-grow'>
          <Window 
            isMarketAnalysis={isMarketAnalysis} 
            isSocialMedia={isSocialMedia} 
            isSmartMatch={isSmartMatch} 
            isFollowers={isFollowers} 
            isFollowing={isFollowing} 
            isChats={isChats} 
             // Pass following state
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;
