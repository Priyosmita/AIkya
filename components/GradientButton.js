"use client";
import React, { useState, useRef } from "react";

const GradientButton = ({ children, gradientColors }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [angle, setAngle] = useState(0);
  const animationRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleMouseEnter = debounce(() => { 
    setIsHovered(true);
    animationRef.current = requestAnimationFrame(animate);
  }, 50); // Adjust delay as needed

  const handleMouseLeave = () => {
    setIsHovered(false);
    cancelAnimationFrame(animationRef.current);
  };

  // hover gradient animation
  const animate = () => {
    setAngle((prevAngle) => (prevAngle + 1.5) % 360); 
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <button
      className={`
        rounded-full
        border-2
        hover:border-none
        px-14
        py-3
        text-white
        transition-all
        duration-300
        ease-in-out
        cursor-pointer
        max-w-md
        hover:scale-110
        ${isHovered ? "" : "bg-transparent"}
      `}
      style={{
        // borderColor: [gradientColors[0],gradientColors[1]],
        background: isHovered
          ? `linear-gradient(${angle}deg, ${gradientColors[0]}, ${gradientColors[1]})`
          : "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default GradientButton;
