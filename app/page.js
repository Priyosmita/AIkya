
import GradientButton from '@/components/GradientButton';
import Carousel3D from '@/components/Carousel3D';
import { AuroraBackground } from '@/components/aurora-background';
import Footer from '@/components/Footer';
const Page = () => {

  const items = [
    {
      image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      title: "Card 1",
      description: "This is the description for card 1.",
    },
    {
      image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      title: "Card 2",
      description: "This is the description for card 2.",
    },
    {
      image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      title: "Card 3",
      description: "This is the description for card 3.",
    },
    {
      image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      title: "Card 4",
      description: "This is the description for card 4.",
    },
    {
      image: "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      title: "Card 5",
      description: "This is the description for card 5.",
    },
  ];

  return (
    <>
      {/* Parent container is relative */}
      <div className='h-screen relative'>
      <AuroraBackground className='h-screen'/>
        {/* Child container is absolute */}
        <img src='/assets/hand.png' className='absolute bottom-0 left-0 w-full -top-8' alt='Hand' />
        <div className='absolute inset-0 flex flex-col text-white'>
          <div className='text-9xl flex justify-center pt-36'>AIkya</div>
          <div className='text-xl mt-5 flex justify-center'>Where Ideas Create Impact</div>
          <div className='flex justify-center pt-96 mt-16'>
            <GradientButton gradientColors={["#ff99a7", "#9bd4c3"]} className='absolute'>
              <p className='text-center text-2xl'>Dashboard</p>
            </GradientButton>
          </div>
          {/* Carousel Section */}
          <div className="flex justify-center">
            <Carousel3D items={items} />
          </div>
          <Footer/>
        </div>
        
      </div>
    </>
  );
};

export default Page;
