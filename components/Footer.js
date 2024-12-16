import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-opacity-0">
      <hr className="border border-[#6f6c6c]" />
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://github.com/Priyosmita/AIkya-Backend" className="flex items-center">
              <img
                src="/assets/logo.png"
                className="h-28 me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                AIkya
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-[#696868]">
                Contact Us
              </h2>
              <ul className="text-gray-500 dark:text-[#696868] font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:text-[#b6b4b4] transition duration-150  "
                  >
                    rijurajdatta8@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:text-[#b6b4b4] transition duration-150"
                  >
                    +91-8100316911
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-[#696868]">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-[#696868] font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:text-[#b6b4b4] transition duration-150">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#b6b4b4] transition duration-150">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              AIkya
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-x-6">
            <FaFacebookF className="scale-125 dark:text-[#696868] hover:text-[#b6b4b4] transition duration-150" />
            <FaLinkedinIn className="scale-150 dark:text-[#696868] hover:text-[#b6b4b4] transition duration-150" />
            <FaInstagram className="scale-150 dark:text-[#696868] hover:text-[#b6b4b4] transition duration-150" />
            <FaXTwitter className="scale-150 dark:text-[#696868] hover:text-[#b6b4b4] transition duration-150" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
