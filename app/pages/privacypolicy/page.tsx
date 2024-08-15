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
                    Privacy Policy
                </div>
                <div className='mt-8 max-w-7xl text-[#649292] text-2xl'>
                    <p><strong>Last Updated: [15.08.2024]</strong></p>

                    <h2 className='text-3xl font-bold mt-6'>Welcome to AIkya</h2>
                    <p>
                        At AIkya, a social networking platform designed to connect entrepreneurs with investors, we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>1. Information We Collect</h3>
                    
                    <h4 className='text-2xl font-semibold mt-4'>1.1 Personal Information</h4>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you register for an account, create a profile, post content, or engage in other activities on AIkya. This information may include, but is not limited to:
                    </p>
                    <ul className='list-disc ml-6 text-2xl'>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Profile picture</li>
                        <li>Business information</li>
                        <li>Financial details (for donations or investments)</li>
                    </ul>

                    <h4 className='text-2xl font-semibold mt-4'>1.2 Usage Data</h4>
                    <p>
                        We may collect information about how you interact with our platform. This includes:
                    </p>
                    <ul className='list-disc ml-6 text-2xl'>
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device type</li>
                        <li>Pages visited</li>
                        <li>Time spent on each page</li>
                        <li>Referring website</li>
                    </ul>

                    <h4 className='text-2xl font-semibold mt-4'>1.3 Cookies and Tracking Technologies</h4>
                    <p>
                        We use cookies and similar tracking technologies to enhance your experience on AIkya. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our platform.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>2. How We Use Your Information</h3>

                    <h4 className='text-2xl font-semibold mt-4'>2.1 Providing Services</h4>
                    <p>
                        We use the information we collect to provide and improve our services. This includes:
                    </p>
                    <ul className='text-2xl list-disc ml-6'>
                        <li>Facilitating connections between users</li>
                        <li>Enabling communication between entrepreneurs and investors</li>
                        <li>Processing transactions and donations</li>
                        <li>Personalizing your experience on AIkya</li>
                    </ul>

                    <h4 className='text-2xl font-semibold mt-4'>2.2 Communication</h4>
                    <p>
                        We may use your personal information to contact you with important updates, newsletters, promotional offers, or other information related to AIkya. You can opt out of receiving marketing communications at any time.
                    </p>

                    <h4 className='text-2xl font-semibold mt-4'>2.3 Legal Compliance</h4>
                    <p>
                        We may use or disclose your information to comply with applicable laws, regulations, or legal processes, including responding to court orders, subpoenas, or government requests.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>3. Sharing Your Information</h3>

                    <h4 className='text-2xl font-semibold mt-4'>3.1 With Other Users</h4>
                    <p>
                        Your profile information, posts, and other content you share on AIkya may be visible to other users. Please be mindful of the information you choose to share publicly.
                    </p>

                    <h4 className='text-2xl font-semibold mt-4'>3.2 With Third Parties</h4>
                    <p>
                        We may share your information with third-party service providers who assist us in operating our platform, processing payments, or providing other services. These providers are contractually obligated to protect your information and only use it for the purposes for which it was disclosed.
                    </p>

                    <h4 className='text-2xl font-semibold mt-4'>3.3 For Legal Reasons</h4>
                    <p>
                        We may disclose your information if we believe it is necessary to:
                    </p>
                    <ul className='text-2xl list-disc ml-6'>
                        <li>Protect the rights, property, or safety of AIkya, our users, or the public</li>
                        <li>Enforce our Terms and Conditions</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h3 className='text-2xl font-semibold mt-6'>4. Data Security</h3>
                    <p>
                        We take the security of your personal information seriously and implement appropriate technical and organizational measures to protect it. However, no method of transmission over the internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>5. Your Rights</h3>

                    <h4 className='text-2xl font-semibold mt-4'>5.1 Access and Update</h4>
                    <p>
                        You have the right to access and update the personal information you have provided to us. You can do this by logging into your account and making the necessary changes.
                    </p>

                    <h4 className='text-2xl font-semibold mt-4'>5.2 Deletion</h4>
                    <p>
                        You may request the deletion of your personal information by contacting us at [Your Contact Information]. Please note that we may retain certain information as required by law or for legitimate business purposes.
                    </p>

                    <h4 className='text-2xl font-semibold mt-4'>5.3 Opt-Out</h4>
                    <p>
                        You can opt out of receiving marketing communications from us by following the unsubscribe instructions in the emails you receive or by contacting us directly.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>6. Children's Privacy</h3>
                    <p>
                        AIkya is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete it as soon as possible.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>7. International Data Transfers</h3>
                    <p>
                        Your information may be transferred to and processed in countries other than your own. These countries may have data protection laws that are different from those in your country of residence. By using AIkya, you consent to the transfer of your information to these countries.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>8. Changes to This Privacy Policy</h3>
                    <p>
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our platform. Your continued use of AIkya after the changes take effect will constitute your acceptance of the revised policy.
                    </p>

                    <h3 className='text-2xl font-semibold mt-6'>9. Contact Us</h3>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us <a className='font-bold' href='https://aikya-theta.vercel.app/pages/contactus'>here</a>.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Page;
