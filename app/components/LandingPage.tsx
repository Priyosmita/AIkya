import React from 'react';
import "../globals.css";
import Image from 'next/image';

const LandingPage = () => {
  return (
    <div className="min-h-screen bgGradient">
      {/* if we put relative, we need absolute. this ensures that no matter what the div elements with relative and absolute will not move what so ever */}
      <div className="relative flex flex-col items-center">
        <span className="absolute top-0 text-white text-11xl text-shadow-lg">AIkya</span>
        <div className="mt-96">
          <Image
            width={900}
            height={900}
            src="/assets/hand.png"
            alt="hand"
          />
        </div>
      </div>
      <div className="flex justify-center gap-x-101 mt-28 p-20">
        <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-5xl px-5 py-2.5 text-center me-2 mb-2 transform trasition duration-300 hover:scale-110">Pink</button>
        <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-5xl px-5 py-2.5 text-center me-2 mb-2 transform trasition duration-300 hover:scale-110">Pink</button>
      </div>
    </div>
  );
};

export default LandingPage;