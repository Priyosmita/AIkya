import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header
      className='bg-white w-full flex flex-row justify-between'
    >
      <div className='flex items-center gap-7'>
        <Image
          src='/assets/logo.png'
          alt='AIkya logo'
          width={62}
          height={80}
          className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
        />
        {/* span is an alternative to div. Unlike div span only takes the place where it is located */}
        <span className='cursor-default text-black text-2xl font-semibold transform transition duration-300 hover:scale-110'>
          AIkya
        </span>
      </div>

      <div className='flex justify-end'>
        {/* all options are kept under nav for SEO purposes */}
        <nav className='flex items-center space-x-6'>
          <Link href="/" legacyBehavior>
            <h2 className='cursor-pointer text-black text-2xl font-semibold transform transition duration-300 hover:scale-110'>About</h2>
          </Link>
          <nav className='flex items-center space-x-6'>
          <Link href="/" legacyBehavior>
            <h2 className='cursor-pointer text-black text-2xl font-semibold transform transition duration-300 hover:scale-110 mr-7'>Pro</h2>
          </Link>
        </nav>
        </nav>
      </div>
    </header>
  )
}

export default Header