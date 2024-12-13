import React from 'react';

const Page = () => {
  return (
    <>
      {/* Parent container is relative */}
      <div className='bg-black h-screen relative'> 
        {/* Child container is absolute */}
        <img src='/assets/hand.png' className='absolute bottom-0 left-0 w-full -top-8' alt='Hand'/>
        <div className='absolute inset-0 flex flex-col text-white'>
          <div className='text-9xl flex justify-center pt-44'>AIkya</div>
          <div className='text-lg mt-2 flex justify-center'>Where Ideas Create Impact</div>
        </div>
        
      </div>
    </>
  );
};

export default Page;
