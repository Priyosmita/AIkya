'use client'

import React from 'react'
import Link from 'next/link'
import { MdOutlineSearch } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { BsChatSquareDots } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";

const LeftSidebar = () => {
    return (
        <div className='w-80 bg-white p-4 rounded-2xl h-101 bg-opacity-50'>
            <nav className='flex flex-col'>
                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <MdOutlineSearch style={{ width: '2.6em', height: '2.6em' }}/><h1 className='text-3xl ml-1'>Search</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <FaEarthAmericas style={{ width: '2.1em', height: '2.1em' }}/><h1 className='text-3xl ml-3'>Social</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <BsChatSquareDots style={{ width: '2.3em', height: '2.3em' }}/><h1 className='text-3xl ml-2'>Chats</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <SlUserFollowing style={{ width: '2.4em', height: '2.4em' }}/><h1 className='text-3xl ml-2'>Following</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <SlUserFollow style={{ width: '2.4em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Followers</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <TbDeviceDesktopAnalytics style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Market Analysis</h1>
                    </button>
                </div>

                <div className='z-20 mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#dbbaa3]'>
                        <GiReceiveMoney style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Funding</h1>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default LeftSidebar