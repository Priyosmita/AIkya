import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';

const page = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-col items-center mt-10 pb-10'>
        <div className='max-w-4xl mt-20 p-8 bg-white bg-opacity-50 rounded-2xl shadow-md'>
          <h1 className='text-5xl text-[#7ebaba] font-semibold text-center mb-8'>Contact Us</h1>
          <p className='text-2xl text-black text-center mb-8'>
            We would love to hear from you! Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <form className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-2xl font-medium text-black'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                required
                className='text-black mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-xl'
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-2xl font-medium text-black'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                required
                className='text-black mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-xl'
              />
            </div>
            <div>
              <label htmlFor='message' className='block text-2xl font-medium text-black'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                rows={4}
                required
                className=' text-black mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-xl'
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='text-black bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-3xl px-6 py-3 text-center transform transition duration-300 hover:scale-110'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
