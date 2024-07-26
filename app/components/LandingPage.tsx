import React from 'react'
import "../globals.css"
import Image from 'next/image'

const LandingPage = () => {
  return (
    <div className="min-h-screen bgGradient">
        <div className='flex justify-center'>
            <Image
            width={900}
            height={900}
            src='/assets/hand.png'
            alt="hand"
            />
        </div>
    </div>
  )
}

export default LandingPage