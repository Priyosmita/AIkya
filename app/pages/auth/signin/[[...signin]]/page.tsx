import React from 'react';
import "../../../../globals.css";
import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className='min-h-screen bgGradient flex justify-center items-center'>
      <SignIn
        appearance={{
          elements: {
            button: 'bg-[#7ebaba] text-black hover:scale-105 transform transition duration-300 hover:bg-[#fdddc6]',
            buttonStyle: { border: 'none !important' },
          },
        }}
      />
    </div>
  );
}

export default Page;