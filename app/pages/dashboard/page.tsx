'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import Window from '@/app/components/Window';
import LeftSidebar from '@/app/components/LeftSidebar';

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType');

  if (userType !== 'Entrepreneur' && userType !== 'Investor') {
    return <p>Invalid user type</p>;
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-row'>
        <LeftSidebar userType={userType as 'Entrepreneur' | 'Investor'} />
        <div className='flex-grow'>
          <Window />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardPage;