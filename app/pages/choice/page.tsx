import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import '../../globals.css'
import Link from 'next/link'

const page = () => {
  return (
    <>
    <Header/>
    <div className='h-102 bgGradient flex flex-row justify-center pt-44'>
        <div className='w-100 h-80 bg-white bg-opacity-30 rounded-2xl shadow-lg'>
            <h2 className='text-[#7ebaba] text-5xl cursor-default flex justify-center mt-16'>Enter Dashboard As</h2>
            <div className='flex flex-row justify-center gap-x-40'>
                <Link href='/pages/dashboard'>
                <button className=' text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-3xl px-5 py-2.5 text-center mt-14 tranform transition duration-300 hover:scale-110'>Entrepreneur
            </button>
            </Link>
            
            <Link href='/'>
                <button className=' text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-3xl px-14 py-2.5 text-center mt-14 tranform transition duration-300 hover:scale-110'>Investor
            </button>
            </Link>
            </div>
            
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default page