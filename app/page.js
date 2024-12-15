import React from 'react';
import GradientButton from '@/components/GradientButton';
import Carousel3D from '@/components/Carousel3D';

const Page = () => {

  const items = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 1",
      description: "This is the description for card 1.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 2",
      description: "This is the description for card 2.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 3",
      description: "This is the description for card 3.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 4",
      description: "This is the description for card 4.",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Card 5",
      description: "This is the description for card 5.",
    },
  ];

  return (
    <>
      {/* Parent container is relative */}
      <div className='h-screen relative'>
        {/* Child container is absolute */}
        <img src='/assets/hand.png' className='absolute bottom-0 left-0 w-full -top-8' alt='Hand' />
        <div className='absolute inset-0 flex flex-col text-white'>
          <div className='text-9xl flex justify-center pt-36'>AIkya</div>
          <div className='text-xl mt-5 flex justify-center'>Where Ideas Create Impact</div>
          <div className='flex justify-center pt-96 mt-16'>
            <GradientButton gradientColors={["#ff99a7", "#9bd4c3"]} className=''>
              <p className='text-center text-2xl'>Dashboard</p>
            </GradientButton>
          </div>
          {/* Carousel Section */}
          <div className="flex justify-center">
            <Carousel3D items={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
