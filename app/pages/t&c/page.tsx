'use client'

import React, { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';

const Page = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <Header />
            <div className='cursor-default min-h-screen bgGradient flex flex-col items-center mt-16 pt-9 pb-24 px-8'>
                <div className={`flex justify-center text-8xl text-white pt-12 text-shadow-md ${mounted ? 'cursor-default' : ''}`}>
                    Terms and Conditions
                </div>
                {mounted && (
                    <div className='max-w-7xl mt-12 text-[#649292]'>
                        <h2 className='text-3xl font-bold mt-8'>1. Introduction</h2>
                        <p className='mt-4 text-2xl'>
                            Welcome to AIkya. These terms and conditions outline the rules and regulations for the use of our social networking platform, located <a className='font-bold' href='https://aikya-theta.vercel.app'>here</a>.
                            By accessing AIkya, you agree to comply with these terms and conditions. If you do not agree to these terms, please do not use our platform.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>2. User Accounts</h2>
                        <h3 className='text-2xl font-semibold mt-6'>2.1 Account Registration</h3>
                        <p className='mt-4 text-2xl'>
                            To access certain features of AIkya, you must create an account. You agree to provide accurate and complete information during the registration process and to keep your account information updated.
                        </p>
                        <h3 className='text-2xl font-semibold mt-6'>2.2 Account Responsibility</h3>
                        <p className='mt-4 text-2xl'>
                            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. AIkya is not liable for any loss or damage arising from your failure to protect your account information.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>3. User Conduct</h2>
                        <p className='mt-4 text-2xl'>
                            By using AIkya, you agree to:
                            <ul className='list-disc list-inside mt-4'>
                                <li><strong>Respect Others:</strong> Engage with other users respectfully and professionally.</li>
                                <li><strong>Lawful Use:</strong> Comply with all applicable laws and regulations.</li>
                                <li><strong>No Misrepresentation:</strong> Do not impersonate others or provide false information.</li>
                                <li><strong>No Spam:</strong> Avoid posting unsolicited advertisements or spam.</li>
                                <li><strong>No Harmful Content:</strong> Do not post or share content that is harmful, abusive, or violates the rights of others.</li>
                            </ul>
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>4. Content Ownership and License</h2>
                        <h3 className='text-2xl font-semibold mt-6'>4.1 User Content</h3>
                        <p className='mt-4 text-2xl'>
                            "User Content" refers to any text, images, videos, or other material that you post or share on AIkya. You retain ownership of your User Content, but by posting it on AIkya, you grant us a non-exclusive, worldwide, royalty-free license to use, distribute, modify, display, and reproduce it in connection with our services.
                        </p>
                        <h3 className='text-2xl font-semibold mt-6'>4.2 Prohibited Content</h3>
                        <p className='mt-4 text-2xl'>
                            You agree not to post any content that:
                            <ul className='list-disc list-inside mt-4'>
                                <li>Infringes on the intellectual property rights of others.</li>
                                <li>Contains offensive, obscene, or defamatory material.</li>
                                <li>Promotes illegal activities.</li>
                            </ul>
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>5. Connections and Communication</h2>
                        <p className='mt-4 text-2xl'>
                            AIkya facilitates connections and communication between users. However, we do not guarantee the accuracy, completeness, or reliability of any information exchanged between users. AIkya is not responsible for any decisions or actions taken based on such communications.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>6. Donations and Financial Transactions</h2>
                        <h3 className='text-2xl font-semibold mt-6'>6.1 Donations</h3>
                        <p className='mt-4 text-2xl'>
                            AIkya allows users to make donations to support entrepreneurs or projects. All donations are voluntary and non-refundable. AIkya is not responsible for how donations are used by recipients.
                        </p>
                        <h3 className='text-2xl font-semibold mt-6'>6.2 Financial Transactions</h3>
                        <p className='mt-4 text-2xl'>
                            Any financial transactions conducted on AIkya must comply with applicable laws and regulations. AIkya does not guarantee the security or success of any financial transactions made through our platform.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>7. Intellectual Property</h2>
                        <p className='mt-4 text-2xl'>
                            AIkya and its content, including but not limited to the design, text, graphics, and software, are owned by AIkya or its licensors and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of AIkya without our express written permission.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>8. Limitation of Liability</h2>
                        <p className='mt-4 text-2xl'>
                            AIkya and its affiliates will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the platform. This includes, but is not limited to, any errors or omissions in content, loss of data, or unauthorized access to your account.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>9. Indemnification</h2>
                        <p className='mt-4 text-2xl'>
                            You agree to indemnify and hold AIkya harmless from any claims, damages, losses, or expenses (including legal fees) arising out of your use of the platform, your violation of these terms, or your infringement of any third-party rights.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>10. Termination</h2>
                        <p className='mt-4 text-2xl'>
                            AIkya reserves the right to suspend or terminate your account at any time, with or without notice, for any reason, including if you violate these Terms and Conditions. Upon termination, your right to use AIkya will immediately cease.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>11. Governing Law</h2>
                        <p className='mt-4 text-2xl'>
                            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>12. Changes to Terms</h2>
                        <p className='mt-4 text-2xl'>
                            AIkya reserves the right to modify these Terms and Conditions at any time. We will notify users of any changes by posting the new terms on our platform. Your continued use of AIkya after such changes will constitute your acceptance of the revised terms.
                        </p>

                        <h2 className='text-3xl font-bold mt-8'>13. Contact Information</h2>
                        <p className='mt-4 text-2xl'>
                            If you have any questions about these Terms and Conditions, please contact us <a className='font-bold' href='https://aikya-theta.vercel.app/pages/contactus'>here</a>.
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Page;