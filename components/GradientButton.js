"use client"
import React, { useState, useRef, useEffect } from 'react';

const GradientButton = ({ children, gradientColors }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [angle, setAngle] = useState(0);
  const animationRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cancelAnimationFrame(animationRef.current);
  };

  const animate = () => {
    setAngle((prevAngle) => (prevAngle + 1) % 360); // Smaller increment for smoother animation
    animationRef.current = requestAnimationFrame(animate); 
  };

  const buttonStyles = {
    borderRadius: '999px', // For pill shape
    border: `2px solid ${gradientColors[0]}`,
    background: isHovered 
      ? `linear-gradient(${angle}deg, ${gradientColors[0]}, ${gradientColors[1]})` 
      : 'transparent',
    color: 'white',
    padding: '5px 10px', // Reduced padding for smaller size
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    maxWidth: '150px', // Limit the maximum width of the button
  };

  return (
    <button 
      style={buttonStyles} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default GradientButton;