'use client'; // Add this directive at the top to mark it as a Client Component

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { trefoil } from 'ldrs';

export default function Home() {
  const { isLoaded, userId } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      setIsSignedIn(!!userId);
    }
  }, [isLoaded, userId]);

  useEffect(() => {
    if (isSignedIn) {
      router.push('/pages/home');
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    trefoil.register();
  }, []);

  if (!isLoaded) {
    return (
      <div
        className='min-h-screen flex justify-center items-center'
        style={{
          background: 'linear-gradient(106deg, rgba(140, 196, 196, 1) 0%, rgba(245, 247, 234, 1) 52%, rgba(252, 217, 195, 1) 100%)'
        }}
      >
        <l-trefoil
          size="60"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="0"
          color="white"
        ></l-trefoil>
      </div>
    );
  }

  return (
    <>
      {!isSignedIn && <><Header /><LandingPage /><Footer /></>}
    </>
  );
}