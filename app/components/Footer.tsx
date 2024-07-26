import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='-100 bg-[#7ebaba] w-full flex justify-between'>
      <div><Image
            src='/assets/logo.png'
            alt='AIkya logo'
            width={100}
            height={100}
            className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
          /></div>
      <div className='h flex flex-row  justify-end items-center'>
        
        <div className='m-10 p-5 h-64 w-60 bg-yellow-400'></div>
        <div className='m-10 p-5 h-64 w-60 bg-yellow-400'></div>
        <div className='m-10 p-5 h-64 w-60 bg-yellow-400'></div>
      </div>
      
    </footer>
  )
}

export default Footer