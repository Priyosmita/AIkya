"use client";


import { useState, useEffect, useRef } from "react";
import React from 'react'
import CustomModal from '../CustomModal';
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { lockScroll, unlockScroll } from '../../utils/scrollLock';


const ProjectForm = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    experience: "",
    certifications: [], // Array to store files with associative text
    skills: [],
    profilePicture: "",
  });
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [projectData, setProjectData] = useState({
    name: "",
    website: "",
    type: "",
    industry: "",
    details: "",
    startedIn: "",
    yearlyRevenue: "",
    yearlyRevenueCurrency: "USD",
    monthlySales: "",
    monthlySalesCurrency: "USD",
    grossMargin: "",
    netMargin: "",
    ebitda: "",
    ebitdaCurrency: "USD",
    skus: "",
    originalAsk: "",
    originalAskCurrency: "USD",
    equityOffered: "",
    debtAccept: false,
    debtAmount: "",
    debtCurrency: "USD",
  });


  const dropdownRef = useRef(null);


  useEffect(() => {
    if (modalIsOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }


    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [modalIsOpen]);


  useEffect(() => {
    if (isModalOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }


    return () => unlockScroll(); // Ensure scroll is unlocked on unmount
  }, [isModalOpen]);


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {


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


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownIndex(null); // Close the dropdown if clicked outside
    }
  };


  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      debtAccept: checked,
      debtAmount: checked ? prevData.debtAmount : "",
    }));
  };


  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectData((prevData) => ({ ...prevData, images: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleProjectSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in projectData) {
      formData.append(key, projectData[key]);
    }
  
    if (fileInputRef.current?.files[0]) {
      formData.append('images', fileInputRef.current.files[0]);
    }
  
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/project/${projects[editIndex]._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/project", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      resetForm();
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submit logic here
    console.log("Project data submitted:", projectData);
    // Optionally close the modal or reset form here
  };


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setProjectData({
      name: "",
      website: "",
      type: "",
      industry: "",
      details: "",
      startedIn: "",
      yearlyRevenue: "",
      monthlySales: "",
      grossMargin: "",
      netMargin: "",
      ebitda: "",
      skus: "",
      originalAsk: "",
      equityOffered: "",
      debtAmount: "",
      images: null,
    });
  };


  const handleEditProject = (index) => {
    setEditIndex(index);
    setProjectData(projects[index]);
    setIsEditing(true);
    setModalIsOpen(true);
    setDropdownIndex(null);
  };


  const handleDeleteProject = async (index) => {
    try {
      const projectId = projects[index]._id;
      await axios.delete(`http://localhost:5000/api/project/${projectId}`);
      const updatedProjects = projects.filter((_, i) => i !== index);
      setProjects(updatedProjects);
      setDropdownIndex(null);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };


  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };


  const handleDeleteAccount = () => {
    if (inputUsername === username) {
      alert("Account deleted successfully!");
      setIsModalOpen(false);
      // Add your account deletion logic here
    } else {
      alert("Username does not match!");
    }
  };


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectIndex(null); // Clear selected project index when closing
  };


  // Delete Modal
  const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;


    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative bg-[#fedeca] bg-opacity-85 p-6 rounded-xl shadow-lg w-[90%] max-w-md">
          <button
            className="absolute top-4 right-4 text-2xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110"
            onClick={onClose}
          >
            <IoCloseSharp />
          </button>
          <h2 className="flex justify-center font-semibold text-2xl text-[#378e8e] mb-2">Confirm Deletion</h2>
          <p className="text-center text-lg text-[#378e8e] mb-4">Are you sure you want to delete this project? This action cannot be undone.</p>
          <div className='flex justify-center'>
            <button
              className='text-white bg-[#df7676] hover:bg-[#c75757] transform transition duration-150 rounded-full px-4 py-2'
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };




  const handleDeleteClick = (index) => {
    setSelectedProjectIndex(index);
    setIsModalOpen(true);
  };


  const handleConfirmDelete = async () => {
    try {
      const projectId = projects[selectedProjectIndex]._id;
      await axios.delete(`http://localhost:5000/api/project/${projectId}`);
      const updatedProjects = projects.filter((_, i) => i !== selectedProjectIndex);
      setProjects(updatedProjects);
      setDropdownIndex(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };


  return (
    <>
      <h2 className="text-[#7ebaba] text-4xl mt-12 mb-6">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-white bg-opacity-50 rounded-lg shadow-md p-4"
          >


            {/* 3 dots */}
            <div className="flex justify-end">
              <button
                className='text-gray-400 hover:text-gray-600 transition duration-100'
                onClick={() => setDropdownIndex(dropdownIndex === index ? null : index)}
              >
                <FaEllipsisV />
              </button>
            </div>


            {dropdownIndex === index && (
              <div
                ref={dropdownRef}
                className="absolute top-1 right-2 w-20 bg-[#fedeca] rounded-lg shadow-lg"
              >
                <div className="absolute top-8 right-2 w-20 bg-[#fedeca] rounded-lg shadow-lg">
                  <div
                    className="p-2 cursor-pointer text-gray-700 hover:bg-[#fac9aa] rounded-lg"
                    onClick={() => handleEditProject(index)}
                  >
                    Edit
                  </div>
                  <div
                    className="p-2 cursor-pointer text-gray-700 hover:bg-[#fac9aa] rounded-lg"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            )}
            <h3 className="text-2xl text-[#7ebaba] mb-2">{project.name}</h3>
            <p className="text-[#6a9696]">{project.website}</p>
            <p className="text-[#6a9696]">{project.type}</p>
            <p className="text-[#6a9696]">{project.industry}</p>
            <p className="text-[#6a9696]">{project.details}</p>
            {project.images && (
              <img
                src={project.images}
                alt="Project"
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}
          </div>
        ))}
        <div
          className="w-40 h-40 bg-white bg-opacity-30 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
          onClick={openModal}
        >
          <span className="text-3xl text-[#6a9696]">+</span>
        </div>
      </div>


      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <form onSubmit={handleProjectSubmit}>
          <h2 className="block cursor-default text-[#378e8e] text-3xl">
            Project Details Form
          </h2>
          <div>
            <label className="block cursor-default text-[#378e8e]  text-xl pt-3 pb-1">Project Name</label>
            <textarea
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleProjectChange}
              rows="1"
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Project Website
            </label>
            <textarea
              type="text"
              name="website"
              value={projectData.website}
              onChange={handleProjectChange}
              rows="1"
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">Project Type</label>
            <select
              name="type"
              value={projectData.type}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            >
              <option value="">Select Type</option>
              <option value="physical">Physical</option>
              <option value="non-physical">Non-Physical</option>
            </select>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">Industry</label>
            <select
              name="industry"
              value={projectData.industry}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            >
              <option value="">Select Industry</option>
              <option value="technology">Software & Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="food&beverages">Food & Beverages</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="sports&fitness">Sports & Fitness</option>
              <option value="Electronics">Electronics</option>
              <option value="cleantech">Clean Tech</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="businessservices">Business Services</option>
              <option value="automotives&vehicles">Automotives & Vehicles</option>
              <option value="entertainment">Entertainment</option>
              <option value="petproducts">Pet Products</option>
              <option value="travel">Travel</option>
              <option value="children">Children</option>
              <option value="others">Others</option>
            </select>


            {projectData.industry === "others" && (
              <input
                type="text"
                name="industryOther"
                placeholder="Specify Industry"
                value={projectData.industryOther || ""}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded-lg text-black mt-2"
              />
            )}
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Project Description & Details
            </label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            ></textarea>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">Started In</label>
            <input
              type="date"
              name="startedIn"
              value={projectData.startedIn}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Yearly Revenue
            </label>
            <input
              type="number"
              name="yearlyRevenue"
              value={projectData.yearlyRevenue}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
            <select
              name="yearlyRevenueCurrency"
              value={projectData.yearlyRevenueCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded-lg text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Monthly Sales
            </label>
            <input
              type="number"
              name="monthlySales"
              value={projectData.monthlySales}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
            <select
              name="monthlySalesCurrency"
              value={projectData.monthlySalesCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded-lg text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Gross Margin (%)
            </label>
            <input
              type="number"
              name="grossMargin"
              value={projectData.grossMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
              step="0.01"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Net Margin (%)
            </label>
            <input
              type="number"
              name="netMargin"
              value={projectData.netMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
              step="0.01"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              EBITDA (Earnings Before Interest, Taxes, Depreciation, and
              Amortization)
            </label>
            <input
              type="number"
              name="ebitda"
              value={projectData.ebitda}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
            <select
              name="ebitdaCurrency"
              value={projectData.ebitdaCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded-lg text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="number"
              name="skus"
              value={projectData.skus}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Funding Required
            </label>
            <input
              type="number"
              name="originalAsk"
              value={projectData.originalAsk}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
            />
            <select
              name="originalAskCurrency"
              value={projectData.originalAskCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded-lg text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Equity Offered (%)
            </label>
            <input
              type="number"
              name="equityOffered"
              value={projectData.equityOffered}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded-lg text-black"
              step="0.01"
            />
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Debt Accepted?
            </label>
            <input
              type="checkbox"
              name="debtAccept"
              checked={projectData.debtAccept}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-[#6a9696] text-xl">Yes</label>
            {projectData.debtAccept && (
              <div>
                <label className="block text-[#6a9696] text-xl">
                  Debt Amount
                </label>
                <input
                  type="number"
                  name="debtAmount"
                  value={projectData.debtAmount}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded-lg text-black"
                />
                <select
                  name="debtCurrency"
                  value={projectData.debtCurrency}
                  onChange={handleCurrencyChange}
                  className="w-full p-2 border rounded-lg text-black mt-2"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
            )}
          </div>
          <div className="pt-4">
            <label className="block cursor-default text-[#378e8e]  text-xl pb-1">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg text-black"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#6fb8b8] text-lg text-white font-bold py-2 px-4 rounded-full hover:bg-[#378e8e] hover:scale-105 transform transition duration-200 mt-4"
              onClick={handleProjectSubmit}
            >
              Save Project
            </button>
          </div>
        </form>
      </CustomModal>


      {/* Deletion confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}


export default ProjectForm