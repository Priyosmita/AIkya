import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='-100 bg-[#7ebaba] w-full flex'>
      <Link href="/" className='mt-12 mb-12 ml-16'><Image
            src='/assets/logo.png'
            alt='AIkya logo'
            width={400}
            height={400}
            className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
          /></Link>
      <div className='h flex flex-row justify-end items-center ml-48'>
        <div className='h-64 w-60'>
          <div>
            mfhdgfgf
          </div>
        </div>

        <div className='h-64 w-80'>
          <Link href="/" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer'>About Us</p>
          </Link>
          <Link href="/" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer mt-24'>Contact Us</p>
          </Link>
        </div>

        <div className='h-64 w-80 mr-11'>
        <Link href="/" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer'>Terms and Conditions</p>
          </Link>
          <Link href="/" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer mt-11'>Privacy Policy</p>
          </Link>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer