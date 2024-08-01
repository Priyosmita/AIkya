'use client'

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import '../../globals.css';
import { useEffect, useState, useRef } from 'react';

const page = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showgoals, setShowgoals] = useState(false);
  const handleScrollPerk = () => {
  const scrollY = window.scrollY;
  const triggerHeight = window.innerHeight / 2;
    if (scrollY > triggerHeight) {
      setShowgoals(true);
    } else {
      setShowgoals(false);
    };
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScrollPerk);
    return () => {
      window.removeEventListener('scroll', handleScrollPerk);
    };
  }, []);

  useEffect(() => {
    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false); // Reset visibility state after animation
            }, 1000); // Duration of the animation
        }
    };
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1 // Adjust the threshold as needed
    });
    if (buttonRef.current) {
        observer.observe(buttonRef.current);
    }
    return () => {
        if (buttonRef.current) {
            observer.unobserve(buttonRef.current);
        }
    };
}, []);

  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-col items-center mt-16 pt-9 pb-10'>
        <div className='flex flex-row mt-32'>
          <h1 className='cursor-default text-8xl text-[#ffffff] font-semibold text-center mb-8 mt-44 mr-24 text-shadow-md'>About AIkya</h1>
          <div className="flex flex-col items-center md:items-end mt-20 md:mt-0">
            <div className='flex flex-row justify-center'>
              <div className="relative flex ">
                <img src='/assets/priyosabout.png' className='aboutPriyosImg transform duration-300 hover:scale-110 ' />
                <div className="hover-text absolute MarginImg top-[-20%] left-1/2 transform -translate-x-3/4 text-[#7ebaba] text-center text-2xl"><p>Priyosmita Das</p>B.Tech, CSE</div>
              </div>
              <div className="relative flex items-center justify-center">
                <img src='/assets/rijuabout.png' className='aboutRijurajImg transform duration-300 hover:scale-110' />
                <div className="hover-text absolute top-[-30%] transform text-[#7ebaba] text-center p-2 text-2xl rijumarginLeft mr-32"><p>Rijuraj Datta</p>B.Tech, CSE</div>
              </div>
            </div>
            <img className='-mt-44 relative scale-125 mr-10' src='/assets/banner.png' />
          </div>
        </div>
        <div className={`flex flex-col mt-28 transition-transform duration-700 ${showgoals ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="text-[#7ebaba] text-8xl ml-14 text-left cursor-default">Our Goals
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-3 gap-y-5 py-9">
              {goals.map((perk, index) => (
                <div key={index} className="ml-11 text-left flex items-center">
                  <li className="text-2xl text-[#7ebaba] px-4 whitespace-nowrap transition duration-300 hover:scale-105 cursor-default">
                    {perk.title}
                  </li>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center mt-10'>
          {/* target='blank' opens a new tab */}
          <Link target='blank' href="https://medium.com/@daspriyosmita2003/aikya-from-ideas-to-impact-88987bf36c6f">
            <button
              ref={buttonRef}
              type="button"

              className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-5xl px-5 py-2.5 text-center me-2 mb-6 transform transition duration-300 hover:scale-110 ${isVisible ? 'animate-fadeInFromBottom' : 'reset-animation'}`}
            >
              Visit Medium Blog
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

const goals = [
  {
    title: 'Empower micro-entrepreneurs',
  },
  {
    title: 'Enhance investor engagement',
  },
  {
    title: 'Foster collaboration and networking',
  },
  {
    title: 'Support sustainable growth',
  },
  {
    title: 'Utilize advanced technology',
  },
  {
    title: 'Expand funding avenues',
  },
  {
    title: 'Promote market awareness',
  },
  {
    title: 'Seamless Integration Flexibility',
  },
  {
    title: 'Continuous Performance Enhancement',
  },
];

export default page;