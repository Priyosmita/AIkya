'use client';

import React, { useState } from 'react';
import { MdOutlineSearch } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { BsChatSquareDots } from "react-icons/bs";
import { SlUserFollowing, SlUserFollow } from "react-icons/sl";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import './components.css'

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
    onFundingClick
}) => {
    const [selected, setSelected] = useState<string>('');

    const handleClick = (option: string, callback: () => void) => {
        setSelected(option);
        callback();
    };

    return (
        <div className='LeftsidebarWidth w-80 bg-white rounded-2xl h-101 bg-opacity-50 mb-6 mr-4 mt-24 ml-3'>
            <nav className='pt-11 flex flex-col gap-y-12'>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'social' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('social', onSocialMediaClick)}
                    >
                        <FaEarthAmericas className='mt-1' style={{ width: '1.9em', height: '1.9em' }} />
                        <h1 className='text-12xl ml-3'>Social</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'chats' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('chats', onChatsClick)}
                    >
                        <BsChatSquareDots className='mt-2' style={{ width: '1.9em', height: '1.9em' }} />
                        <h1 className='text-12xl ml-2'>Chats</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'following' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('following', onFollowingClick)}
                    >
                        <SlUserFollowing className='mt-1' style={{ width: '2em', height: '2em' }} />
                        <h1 className='text-12xl ml-2'>Following</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'followers' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('followers', onFollowersClick)}
                    >
                        <SlUserFollow className='mt-1' style={{ width: '2em', height: '2em' }} />
                        <h1 className='text-12xl ml-2'>Followers</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'smartMatch' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('smartMatch', onSmartMatchClick)}
                    >
                        <FaRegHandshake className='mt-1' style={{ width: '2.2em', height: '2.2em' }} />
                        <h1 className='text-12xl ml-2'>Smart Match</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'marketAnalysis' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('marketAnalysis', onMarketAnalysisClick)}
                    >
                        <TbDeviceDesktopAnalytics className='mt-1' style={{ width: '2.2em', height: '2.2em' }} />
                        <h1 className='text-12xl ml-2'>Market Analysis</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'funding' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('funding', onFundingClick)}
                    >
                        <GiReceiveMoney style={{ width: '2.2em', height: '2.2em' }} />
                        <h1 className='text-12xl ml-2'>Funding</h1>
                    </button>
                </div>
                <div className='ml-6 flex flex-row'>
                    <button
                        className={`flex flex-row transform transition duration-300 ${selected === 'donations' ? 'text-[#e8b693]' : 'text-[#7ebaba]'} hover:scale-110`}
                        onClick={() => handleClick('donations', onDonationsClick)}
                    >
                        <GiPayMoney className='mt-1' style={{ width: '2.2em', height: '2.2em' }} />
                        <h1 className='text-12xl ml-2'>Donations</h1>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default LeftSidebar;