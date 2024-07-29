'use client';


import React, { useEffect, useRef, useState } from 'react';
import "../../globals.css";
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';


// Define the type for feature items
interface Feature {
  src: string;
  alt: string;
  text: string;
}


const Home: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);


    useEffect(() => {
        const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                setTimeout(() => {
                    setIsVisible(false); // Reset visibility state after animation
                }, 1000); // Duration of the animation
            }
        };


        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1 // Adjust the threshold as needed
        });


        if (buttonRef.current) {
            observer.observe(buttonRef.current);
        }


        return () => {
            if (buttonRef.current) {
                observer.unobserve(buttonRef.current);
            }
        };
    }, []);


    // Feature data
    const features: Feature[] = [
        { src: "/assets/ai matchmaking.png", alt: "AI Matchmaking", text: "Connecting Visionary Entrepreneurs with Ideal Investors Through Advanced AI Driven Smart Matchmaking" },
        { src: "/assets/integrated communication.png", alt: "Integrated Communication", text: "Empowering Direct Collaboration: Instant Connections for Entrepreneurs and Investors" },
        { src: "/assets/crowd funding.png", alt: "Crowd Funding", text: "Unlocking Broader Horizons, Crowdfunding for Entrepreneurs to Reach New Backers and Capital" },
        { src: "/assets/social media.png", alt: "Social Media", text: "Showcase, Engage, and Connect - A Social Media Hub for Entrepreneurs and Investors" },
        { src: "/assets/market analysis.png", alt: "Market Analysis", text: "Real-Time Market Insights for Smarter Strategies and Informed Decisions" }
    ];


    return (
        <>
            <Header />
            <div className="min-h-screen bgGradient">
                <div className="relative flex flex-col items-center">
                    <span className="absolute top-0 mt-10 text-white text-11xl text-shadow-lg cursor-default">AIkya</span>
                    <span className="absolute mt-65 text-white text-5xl text-shadow-lg cursor-default animate-expand">From Ideas To Impact</span>
                    <div className="mt-66 animate-handFadeIn">
                        <Image
                            width={900}
                            height={900}
                            src="/assets/hand.png"
                            alt="hand"
                            className="hand-image"
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center mt-40'>
                    <Link href="/pages/choice">
                        <button
                            ref={buttonRef}
                            type="button"
                            className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-5xl px-5 py-2.5 text-center me-2 mb-2 transform transition duration-300 hover:scale-110 ${isVisible ? 'animate-fadeInFromBottom' : 'reset-animation'}`}
                        >
                            Dashboard
                        </button>
                    </Link>
                </div>


                <div className="flex flex-row justify-center items-center gap-x-20 mt-40 pb-64 text-shadow-lg">
                    {features.map(({ src, alt, text }, index) => (
                        <div key={index} className="image-container">
                            <Image height={250} width={250} src={src} alt={alt} />
                            <p className='cursor-default'>{text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};


export default Home;