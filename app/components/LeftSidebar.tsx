'use client';

import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { BsChatSquareDots } from "react-icons/bs";
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";

interface LeftSidebarProps {
    userType?: 'Entrepreneur' | 'Investor';
    onMarketAnalysisClick: () => void;
    onSocialMediaClick: () => void;
    onSmartMatchClick: () => void;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
    onChatsClick: () => void;
    onDonationsClick: () => void;
    onFundingClick: () => void;
    onSearchClick: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
    userType,
    onMarketAnalysisClick,
    onSocialMediaClick,
    onSmartMatchClick,
    onFollowersClick,
    onFollowingClick,
    onChatsClick,
    onDonationsClick,
    onFundingClick,
    onSearchClick,
}) => {
    const [selected, setSelected] = useState<string>('');

    const handleClick = (option: string, callback: () => void) => {
        setSelected(option);
        callback();
    };

    return (
        <div className='w-80 bg-white rounded-2xl h-101 bg-opacity-50 mb-6 mr-4 mt-24 ml-3'>
            <nav className='flex flex-col gap-y-14'>
                <div className='mt-12 ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'search' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('search', onSearchClick)}
                    >
                        <MdOutlineSearch style={{ width: '2.6em', height: '2.6em' }} />
                        <h1 className='text-3xl ml-1'>Search</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'social' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('social', onSocialMediaClick)}
                    >
                        <FaEarthAmericas style={{ width: '2.1em', height: '2.1em' }} />
                        <h1 className='text-3xl ml-3'>Social</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'chats' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('chats', onChatsClick)}
                    >
                        <BsChatSquareDots style={{ width: '2.3em', height: '2.3em' }} />
                        <h1 className='text-3xl ml-2'>Chats</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'following' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('following', onFollowingClick)}
                    >
                        <SlUserFollowing style={{ width: '2.4em', height: '2.4em' }} />
                        <h1 className='text-3xl ml-2'>Following</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'followers' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('followers', onFollowersClick)}
                    >
                        <SlUserFollow style={{ width: '2.4em', height: '2.5em' }} />
                        <h1 className='text-3xl ml-2'>Followers</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'smartMatch' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('smartMatch', onSmartMatchClick)}
                    >
                        <FaRegHandshake style={{ width: '2.5em', height: '2.5em' }} />
                        <h1 className='text-3xl ml-2'>Smart Match</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'marketAnalysis' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('marketAnalysis', onMarketAnalysisClick)}
                    >
                        <TbDeviceDesktopAnalytics style={{ width: '2.5em', height: '2.5em' }} />
                        <h1 className='text-3xl ml-2'>Market Analysis</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'funding' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('funding', onFundingClick)}
                    >
                        <GiReceiveMoney style={{ width: '2.5em', height: '2.5em' }} />
                        <h1 className='text-3xl ml-2'>Funding</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'donations' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('donations', onDonationsClick)}
                    >
                        <GiPayMoney style={{ width: '2.5em', height: '2.5em' }} />
                        <h1 className='text-3xl ml-2'>Donations</h1>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default LeftSidebar;
