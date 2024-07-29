'use client'

import React from 'react';
import Link from 'next/link';
import { MdOutlineSearch } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { BsChatSquareDots } from "react-icons/bs";
import { SlUserFollowing } from "react-icons/sl";
import { SlUserFollow } from "react-icons/sl";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";

interface LeftSidebarProps {
    userType: 'Entrepreneur' | 'Investor';
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ userType }) => {
    return (
        <div className='w-80 bg-white rounded-2xl h-101 bg-opacity-50 mb-6 mr-4 mt-24 ml-3'>
            <nav className='flex flex-col'>
                <div className='mt-12 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <MdOutlineSearch style={{ width: '2.6em', height: '2.6em' }}/><h1 className='text-3xl ml-1'>Search</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <FaEarthAmericas style={{ width: '2.1em', height: '2.1em' }}/><h1 className='text-3xl ml-3'>Social</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <BsChatSquareDots style={{ width: '2.3em', height: '2.3em' }}/><h1 className='text-3xl ml-2'>Chats</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <SlUserFollowing style={{ width: '2.4em', height: '2.4em' }}/><h1 className='text-3xl ml-2'>Following</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <SlUserFollow style={{ width: '2.4em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Followers</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <FaRegHandshake style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Smart Match</h1>
                    </button>
                </div>
                <div className='mt-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <TbDeviceDesktopAnalytics style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Market Analysis</h1>
                    </button>
                </div>
                {userType === 'Entrepreneur' && (
                    <div className='mt-14 ml-6 flex flex-row'>
                        <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                            <GiReceiveMoney style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Funding</h1>
                        </button>
                    </div>
                )}
                <div className='mt-14 mb-14 ml-6 flex flex-row'>
                    <button className='flex flex-row text-[#7ebaba] transform transition duration-300 hover:scale-110 hover:text-[#e8b693]'>
                        <GiPayMoney style={{ width: '2.5em', height: '2.5em' }}/><h1 className='text-3xl ml-2'>Donations</h1>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default LeftSidebar;
