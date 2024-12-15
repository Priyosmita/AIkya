"use client";
import React, { useState, useEffect } from "react";
import { useSprings, animated } from "@react-spring/web";

const Carousel3D = ({ items }) => {
  const itemsCount = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically rotate the carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemsCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [itemsCount]);

  // Create springs for each item based on activeIndex
  const springs = useSprings(
    itemsCount,
    items.map((_, i) => {
      const offset = (i - activeIndex + itemsCount) % itemsCount; // Circular index
      const isFront = offset === 0; // Middle card
      const isLeft = offset === itemsCount - 1; // Left card
      const isRight = offset === 1; // Right card

      return {
        transform: isFront
          ? `translateX(0%) translateZ(100px) scale(1.2)` // Middle card pops forward
          : isLeft
          ? `translateX(-120%) translateZ(0px) scale(0.9)` // Left card
          : isRight
          ? `translateX(120%) translateZ(0px) scale(0.9)` // Right card
          : `translateX(200%) translateZ(-200px) scale(0.6)`, // Cards not visible
        opacity: isFront || isLeft || isRight ? 1 : 0, // Only visible cards have opacity
        config: { mass: 1, tension: 200, friction: 30 },
      };
    })
  );

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="relative w-[80%] h-[500px] perspective-1000 flex justify-center items-center">
        {springs.map((styles, index) => (
          <animated.div
            key={index}
            style={styles}
            className={`absolute w-[300px] h-[400px] bg-white shadow-xl flex flex-col items-center justify-start rounded-lg overflow-hidden transition-all duration-500`}
          >
            <img
              src={items[index].image}
              alt={items[index].title}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {items[index].title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {items[index].description}
              </p>
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
