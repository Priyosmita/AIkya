import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import '../../globals.css';

const page = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-col items-center mt-16 pt-9 pb-10'>

        <div className='flex flex-row mt-32 gap-x-7'>
          <h1 className='cursor-default text-8xl text-[#7ebaba] font-semibold text-center mb-8 mt-24'>About AIkya</h1>
          <div className="flex flex-col items-center md:items-end mt-20 md:mt-0">
            <div className='flex flex-row justify-center'>
              <div className="relative flex items-center justify-center">
                <img src='/assets/priyosabout.png' className='aboutPriyosImg transform duration-300 hover:scale-110' />
                <div className="hover-text absolute MarginImg top-[-12%] left-1/2 transform -translate-x-1/2 text-white text-center text-2xl"><p>Priyosmita Das</p>B.Tech, CSE</div>
              </div>
              <div className="relative flex items-center justify-center">
                <img src='/assets/rijuabout.png' className='aboutRijurajImg transform duration-300 hover:scale-110' />
                <div className="hover-text absolute top-[-32%] MarginImg transform -translate-x-1/2 text-white text-center p-2 text-2xl rijumarginLeft"><p>Rijuraj Datta</p>B.Tech, CSE</div>
              </div>
            </div>
            <img className='relative -mt-40 scale-150 mr-52' src='/assets/about banner.png' />
          </div>
        </div>





        {/* <p className='text-2xl text-black text-center mb-8'>
          AIkya is a revolutionary platform designed to connect visionary entrepreneurs with the ideal investors and resources they need to turn their ideas into impactful realities.
        </p>
        <div className='flex flex-col items-center mb-8'>

          <p className='text-2xl text-black mt-6'>
            Our team is dedicated to fostering innovation and collaboration, providing tools and opportunities for growth and success.
          </p>
        </div>
        <div className='text-2xl text-black mb-8'>
          <h2 className='text-4xl text-[#7ebaba] font-semibold text-center mb-4'>Our Mission</h2>
          <p>
            At AIkya, our mission is to bridge the gap between entrepreneurs and investors by leveraging advanced AI-driven matchmaking, real-time market insights, and a comprehensive resource network.
          </p>
        </div>
        <div className='text-2xl text-black mb-8'>
          <h2 className='text-4xl text-[#7ebaba] font-semibold text-center mb-4'>Our Vision</h2>
          <p>
            We envision a world where every great idea has the opportunity to flourish, and where entrepreneurs have the support and resources they need to make a positive impact on society.
          </p>
        </div>
        <div className='text-2xl text-black mb-8'>
          <h2 className='text-4xl text-[#7ebaba] font-semibold text-center mb-4'>Join Us</h2>
          <p>
            Whether you're an entrepreneur looking for the right investor, or an investor seeking the next big opportunity, AIkya is the platform for you. Join us on this journey and be a part of the future of innovation and growth.
          </p>
        </div>
        <div className='flex justify-center'>
          <Link href="/pages/signup">
            <button
              type="button"
              className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-3xl px-6 py-3 text-center mb-6 transform transition duration-300 hover:scale-110'
            >
              Get Started
            </button>
          </Link>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default page;