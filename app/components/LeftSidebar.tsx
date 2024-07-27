'use client'

import React from 'react'
import Link from 'next/link'
import { MdOutlineSearch } from "react-icons/md";

const LeftSidebar = () => {
    return (
        <div className='w-80 bg-white p-4 rounded-2xl h-101 bg-opacity-50'>
            <nav className='flex flex-col space-y-4'>
                <div className='z-20 mt-10 flex flex-row'>
                    <MdOutlineSearch className='text-[#7ebaba] transform transition duration-300 hover:scale-150 hover:text-[#dbbaa3]'style={{ width: '2.5em', height: '2.5em' }}>
                    Search
                    </MdOutlineSearch>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar