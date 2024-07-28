import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import '../../globals.css'
import Window from '@/app/components/Window'
import LeftSidebar from '@/app/components/LeftSidebar'

const page = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-row overflow-hidden '>
        <div className='pt-24 pl-4'><LeftSidebar/></div>
        <div className='pt-24 pl-4'><Window/></div>
      </div>
      <Footer />
    </>
  )
}

export default page