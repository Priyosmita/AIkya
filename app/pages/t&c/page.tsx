'use client'

import React from 'react'
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';

const page = () => {
    return (
        <>
            <Header />
            <div className='min-h-screen bgGradient flex flex-col items-center mt-16 pt-9 pb-10'>
                <div className='flex justify-center text-8xl text-white pt-12 text-shadow-md cursor-default'>Terms and Conditions</div>
            </div>
            <Footer />
        </>
    )
}

export default page