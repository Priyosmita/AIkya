"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import axios from "axios";

const Header: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  const [formData, setFormData] = useState({
    name: "",
    about: "",
    experience: "",
    certifications: [], // Array to store files with associative text
    skills: [],
    profilePicture: null, // Store the file object
    profilePicturePreview: "", // Store the preview URL
  });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {
        const profileResponse = await axios.get(
          "http://localhost:5000/api/profile"
        );
        if (profileResponse.data) {
          setFormData((prevData) => ({
            ...prevData,
            ...profileResponse.data,
            profilePicturePreview: profileResponse.data.profilePicture
              ? `http://localhost:5000/${profileResponse.data.profilePicture}`
              : "",
          }));
        }
        const projectResponse = await axios.get(
          "http://localhost:5000/api/projects"
        );
        setProjects(projectResponse.data);
      } catch (error) {
        console.error(
          "There was an error fetching profile and projects!",
          error
        );
      }
    };
    fetchProfileAndProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > scrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  // Load profile picture from local storage
  useEffect(() => {
    try {
      const storedImage = localStorage.getItem("profilePicture");
      if (storedImage) {
        setProfilePicture(storedImage);
      }
    } catch (error) {
      console.error("Failed to load profile picture:", error);
    }
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <header
      className={`bg-[#ffffff] w-full flex flex-row justify-between top-0 z-10 fixed transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-7">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="AIkya logo"
            width={62}
            height={80}
            className="cursor-pointer transform duration-300 hover:scale-110 mt-2 mb-2 ml-5"
          />
        </Link>
        <span className="cursor-default text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:text-[#f8b891]">
          AIkya
        </span>
      </div>

      <div className="flex justify-end">
        <nav className="flex items-center space-x-12 mr-10">
          {isSignedIn && (
            <Link href="/pages/choice" legacyBehavior>
              <a className="cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]">
                Dashboard
              </a>
            </Link>
          )}
          <Link href="/pages/about" legacyBehavior>
            <a className="cursor-pointer text-[#7ebaba] text-3xl font-semibold transform transition duration-300 hover:scale-110 hover:text-[#f8b891]">
              About
            </a>
          </Link>

          {isSignedIn && (
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer transform transition duration-300 hover:scale-110"
                onClick={toggleDropdown}
              >
                {formData.profilePicturePreview ? (
                  <img
                    src={formData.profilePicturePreview}
                    alt="Profile"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <span className="text-4xl text-[#6a9696]">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                )}
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                  <Link href="/pages/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Visit Profile
                    </a>
                  </Link>
                  <hr />
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
