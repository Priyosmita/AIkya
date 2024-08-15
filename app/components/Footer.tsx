import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='-100 bg-[#7ebaba] w-full flex overflow-hidden'>
      <Link href="/" className='mt-12 mb-12 ml-16'><Image
        src='/assets/logo.png'
        alt='AIkya logo'
        width={400}
        height={400}
        className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
      /></Link>
      <span className='h flex flex-row justify-end items-center ml-48'>
        <div className='h-64 w-60'>
          <div className='text-3xl cursor-default'>Socials</div>
          <Link href="https://www.instagram.com/pritae03/">
            <IoLogoInstagram className='mt-6 transform transition duration-300 hover:scale-150 hover:text-[#ffd9c1]' style={{ width: '2.5em', height: '2.5em' }}/>
          </Link>

          <Link href="https://www.facebook.com/rijuraj.datta.5?mibextid=ZbWKwL">
            <IoLogoFacebook className='mt-6 transform transition duration-300 hover:scale-150 hover:text-[#ffd9c1]' style={{ width: '2.5em', height: '2.5em' }}/>
          </Link>

          <Link href="https://x.com/RijurajDatta?t=VF2vFUFynxnSe4t37PpBUg&s=09">
            <FaXTwitter className='mt-6 transform transition duration-300 hover:scale-150 hover:text-[#ffd9c1]' style={{ width: '2.5em', height: '2.5em' }}/>
            </Link>

          <Link href="https://www.linkedin.com/in/priyosmita-das">
            <IoLogoLinkedin className='mt-6 transform transition duration-300 hover:scale-150 hover:text-[#ffd9c1]' style={{ width: '2.5em', height: '2.5em' }}/>
            </Link>
        </div>

        <span className='h-64 w-60 text-center'>
          <Link href="/pages/about" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer hover:text-[#ffd9c1]'>About Us</p>
          </Link>
          <Link href="/pages/contactus" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer mt-24 hover:text-[#ffd9c1]'>Contact Us</p>
          </Link>
        </span>

        <div className='h-64 w-80 ml-32 mr-8  text-center'>
          <Link href="/pages/t&c" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer hover:text-[#ffd9c1]'>Terms and Conditions</p>
          </Link>
          <Link href="/pages/privacypolicy" legacyBehavior>
            <p className='text-3xl transform transition duration-300 hover:scale-110 cursor-pointer mt-24 hover:text-[#ffd9c1]'>Privacy Policy</p>
          </Link>
        </div>
      </span>

    </footer>
  )
}

export default Footer