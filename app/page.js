import React from 'react';
import GradientButton from '@/components/GradientButton';

const Page = () => {
  return (
    <>
      {/* Parent container is relative */}
      <div className='bg-black h-screen relative'>
        {/* Child container is absolute */}
        <img src='/assets/hand.png' className='absolute bottom-0 left-0 w-full -top-8' alt='Hand' />
        <div className='absolute inset-0 flex flex-col text-white'>
          <div className='text-9xl flex justify-center pt-36'>AIkya</div>
          <div className='text-xl mt-5 flex justify-center'>Where Ideas Create Impact</div>
          <div className='flex justify-center pt-80'>
            <GradientButton gradientColors={["#ff99a7", "#9bd4c3"]} className=''>
              <p className=''>Dashboard</p>
            </GradientButton>
          </div>
        </div>
        {/* dashboard button */}
      </div>
    </>
  );
};

export default Page;
