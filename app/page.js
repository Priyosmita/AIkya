"use client"
import React, { useEffect, useState } from 'react';
import GradientButton from '@/components/GradientButton';
import Carousel3D from '@/components/Carousel3D';
import { AuroraBackground } from '@/components/aurora-background';
import Footer from '@/components/Footer';

const Page = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Lock scroll while animation is in progress
    const handleScroll = (e) => {
      if (isAnimating) {
        window.scrollTo(0, 0);
      }
    };

    if (isAnimating) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimating]);

  // Automatically stop the animation state after 1s (matches animation duration)
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
      {/* Parent container */}
      <div className="h-screen relative overflow-scroll">
        {/* Aurora background */}
        <AuroraBackground className="h-screen" />

        {/* Hand image with animation */}
        <div className="absolute bottom-0 left-0 w-full">
          <img
            src="/assets/hand.png"
            className="w-full animate-slideUp"
            alt="Hand"
          />
        </div>

        {/* Main content */}
        <div className="absolute inset-0 flex flex-col text-white">
          <div className="text-9xl flex justify-center pt-36">AIkya</div>
          <div className="text-xl mt-5 flex justify-center">Where Ideas Create Impact</div>
          <div className="flex justify-center pt-96 mt-16">
            <GradientButton gradientColors={["#ff99a7", "#9bd4c3"]} className="absolute">
              <p className="text-center text-2xl">Dashboard</p>
            </GradientButton>
          </div>

          {/* Carousel Section */}
          <div className="flex justify-center">
            <Carousel3D items={items} />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
