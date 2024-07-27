import React from 'react';
import "../../../../globals.css";
import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className='min-h-screen bgGradient flex justify-center items-center'>
      <SignUp
        appearance={{
          elements: {
            button: 'bg-[#7ebaba] text-black hover:scale-105 transform transition duration-300 hover:bg-[#fde9d1]',
            buttonStyle: { border: 'none !important' },
          },
        }}
      />
    </div>
  );
}

export default Page;