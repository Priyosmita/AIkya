import React from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import '../../globals.css'

const page = () => {
  return (
    <>
    <Header/>
    <div className='min-h-screen bgGradient'>
    </div>
    <Footer/>
    </>
  )
}

export default page