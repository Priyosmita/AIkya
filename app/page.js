import React from "react";
import GradientButton from "@/components/GradientButton";
import Spotlight from "@/components/Spotlight/Spotlight";
import Carousel3D from "@/components/Carousel3D";

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
      <div className="h-screen relative">
        <Spotlight />
        {/* Decorative Hand Image */}
        <img
          src="/assets/hand.png"
          className="absolute bottom-0 left-0 w-full -top-8"
          alt="Hand"
        />
        <div className="absolute inset-0 flex flex-col text-white">
          {/* Title */}
          <div className="text-9xl flex justify-center pt-36">AIkya</div>
          <div className="text-xl mt-5 flex justify-center">
            Where Ideas Create Impact
          </div>
          {/* Gradient Button */}
          <div className="flex justify-center mt-16">
            <GradientButton gradientColors={["#ff99a7", "#9bd4c3"]}>
              <p className="text-center text-2xl">Dashboard</p>
            </GradientButton>
          </div>
          {/* Carousel Section */}
          <div className="flex justify-center pt-36">
            <Carousel3D items={items} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
