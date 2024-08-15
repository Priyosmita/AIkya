'use client'

import React, { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';

const Page = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <Header />
            <div className='cursor-default min-h-screen bgGradient flex flex-col items-center mt-16 pt-9 pb-24 px-8'>
                <div className={`flex justify-center text-8xl text-white pt-12 text-shadow-md ${mounted ? 'cursor-default' : ''}`}>
                    Privacy Policy
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page;