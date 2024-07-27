'use client'; // Add this directive at the top to mark it as a Client Component

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Footer from './components/Footer';
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

  return (
    <>
      {!isSignedIn && <><Header/><LandingPage /><Footer/></>}
    </>
  );
}
