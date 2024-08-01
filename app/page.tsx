'use client'; // Add this directive at the top to mark it as a Client Component

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { dotWave } from 'ldrs';

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
    dotWave.register();
  }, []);

  if (!isLoaded) {
    return (
      <div
        className='min-h-screen flex justify-center items-center'
        style={{
          background: 'linear-gradient(106deg, rgba(140, 196, 196, 1) 0%, rgba(245, 247, 234, 1) 52%, rgba(252, 217, 195, 1) 100%)'
        }}
      >
        <l-dot-wave
          size="100"
          speed="1"
          color="white"
        ></l-dot-wave>
      </div>
    );
  }

  return (
    <>
      {!isSignedIn && <><Header /><LandingPage /><Footer /></>}
    </>
  );
}
