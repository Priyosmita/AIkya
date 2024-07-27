'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';

const Header = () => {

  const [hidden, setHidden] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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
        <Image
          src='/assets/logo.png'
          alt='AIkya logo'
          width={62}
          height={80}
          className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
        />
        {/* span is an alternative to div. Unlike div span only takes the place where it is located */}
        <span className='cursor-default text-black text-2xl font-semibold transform transition duration-300 hover:scale-110'>
          AIkya
        </span>
      </div>

      <div className='flex justify-end'>
        {/* all options are kept under nav for SEO purposes */}
        <nav className='flex items-center space-x-6'>
          <Link href="/" legacyBehavior>
            <h2 className='cursor-pointer text-black text-2xl font-semibold transform transition duration-300 hover:scale-110 mr-8'>About</h2>
          </Link>
          <nav className='flex items-center'>
            <div className="user-button-wrapper mr-10 mt-2 scale-150 transform transition duration-300 hover:scale-201">
              <UserButton />
            </div>
          </nav>
        </nav>
      </div>
    </header>
  )
}

export default Header