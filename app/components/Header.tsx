'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';

const Header: React.FC = () => {
  const [hidden, setHidden] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <header
      className={`bg-[#ffffff] w-full flex flex-row justify-between top-0 z-10 fixed transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className='flex items-center gap-7'>
        <Link href='/'>
          <Image
            src='/assets/logo.png'
            alt='AIkya logo'
            width={62}
            height={80}
            className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
          />
        </Link>
        <span className='cursor-default text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:text-[#f8b891]'>
          AIkya
        </span>
      </div>

      <div className='flex justify-end'>
        <nav className='flex items-center space-x-12 mr-10'>
          {isSignedIn && (
            <Link href="/pages/dashboard" legacyBehavior>
              <h2 className='cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]'>
                Dashboard
              </h2>
            </Link>
          )}
          <Link href="/pages/about" legacyBehavior>
            <h2 className='cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]'>
              About
            </h2>
          </Link>
          <div className="user-button-wrapper mt-2 scale-150 transform transition duration-300 hover:scale-201">
            <UserButton />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header