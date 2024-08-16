'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth, useUser, useClerk } from '@clerk/nextjs';

const Header: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser(); 
  const { signOut } = useClerk(); 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > scrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  // Load profile picture from local storage
  useEffect(() => {
    try {
      const storedImage = localStorage.getItem('profilePicture');
      if (storedImage) {
        setProfilePicture(storedImage);
      }
    } catch (error) {
      console.error("Failed to load profile picture:", error);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <header className={`bg-[#ffffff] w-full flex flex-row justify-between top-0 z-10 fixed transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
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
            <Link href="/pages/choice" legacyBehavior>
              <a className='cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]'>
                Dashboard
              </a>
            </Link>
          )}
          <Link href="/pages/about" legacyBehavior>
            <a className='cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]'>
              About
            </a>
          </Link>

          {isSignedIn && (
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transform transition duration-300 hover:scale-110"
                onClick={toggleDropdown}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <img
                    src={"https://via.placeholder.com/48"}
                    alt="Default Profile"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                  <Link href="/pages/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Visit Profile</a>
                  </Link>
                  <hr />
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;