"use client";
import { useState, useEffect } from "react";
import React from 'react'
import CustomModal from '../CustomModal';
import axios from "axios";

const ProjectForm = () => {
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
    useEffect(() => {
        const fetchProfileAndProjects = async () => {
          try {
            const profileResponse = await axios.get(
              "http://localhost:5000/api/profile"
            );
            if (profileResponse.data) {
              setFormData(profileResponse.data);
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
        try {
          if (isEditing) {
            console.log("Updating project:", projectData); // Debugging line
            const response = await axios.put(
              `http://localhost:5000/api/project/${projects[editIndex]._id}`,
              projectData
            );
            const updatedProject = response.data;
    
            // Update the state with the edited project
            setProjects((prevProjects) =>
              prevProjects.map((proj, index) =>
                index === editIndex ? updatedProject : proj
              )
            );
          } else {
            console.log("Creating new project:", projectData); // Debugging line
            const response = await axios.post(
              "http://localhost:5000/api/project",
              projectData
            );
            const newProject = response.data;
            setProjects((prevProjects) => [...prevProjects, newProject]);
          }
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
          setModalIsOpen(false);
          setIsEditing(false);
          setEditIndex(null);
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
        setInputUsername(""); // Clear the input field when closing the modal
      };
  return (
      <>
          <h2 className="text-[#7ebaba] text-4xl mt-12 mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative bg-white bg-opacity-30 rounded-lg shadow-md p-4"
              >
                <div
                  className="absolute top-2 right-2 cursor-pointer text-3xl text-[#6a9696]"
                  onClick={() => toggleDropdown(index)}
                >
                  &#x22EE;
                </div>
                {dropdownIndex === index && (
                  <div className="absolute top-8 right-2 bg-white shadow-md rounded">
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                      onClick={() => handleEditProject(index)}
                    >
                      Edit
                    </div>
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                      onClick={() => handleDeleteProject(index)}
                    >
                      Delete
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
          <div>
            <label className="block text-[#6a9696] text-xl">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Project Website
            </label>
            <input
              type="text"
              name="website"
              value={projectData.website}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Project Type</label>
            <select
              name="type"
              value={projectData.type}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Select Type</option>
              <option value="physical">Physical</option>
              <option value="non-physical">Non-Physical</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Industry</label>
            <select
              name="industry"
              value={projectData.industry}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="others">Others</option>
            </select>
            {projectData.industry === "others" && (
              <input
                type="text"
                name="industryOther"
                placeholder="Specify Industry"
                value={projectData.industryOther || ""}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded text-black mt-2"
              />
            )}
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Project Details
            </label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            ></textarea>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Started In</label>
            <input
              type="date"
              name="startedIn"
              value={projectData.startedIn}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Yearly Revenue
            </label>
            <input
              type="number"
              name="yearlyRevenue"
              value={projectData.yearlyRevenue}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="yearlyRevenueCurrency"
              value={projectData.yearlyRevenueCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Monthly Sales
            </label>
            <input
              type="number"
              name="monthlySales"
              value={projectData.monthlySales}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="monthlySalesCurrency"
              value={projectData.monthlySalesCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Gross Margin (%)
            </label>
            <input
              type="number"
              name="grossMargin"
              value={projectData.grossMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Net Margin (%)
            </label>
            <input
              type="number"
              name="netMargin"
              value={projectData.netMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              EBITDA (Earnings Before Interest, Taxes, Depreciation, and
              Amortization)
            </label>
            <input
              type="number"
              name="ebitda"
              value={projectData.ebitda}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="ebitdaCurrency"
              value={projectData.ebitdaCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="number"
              name="skus"
              value={projectData.skus}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Funding Required
            </label>
            <input
              type="number"
              name="originalAsk"
              value={projectData.originalAsk}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="originalAskCurrency"
              value={projectData.originalAskCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Equity Offered (%)
            </label>
            <input
              type="number"
              name="equityOffered"
              value={projectData.equityOffered}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
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
                  className="w-full p-2 border rounded text-black"
                />
                <select
                  name="debtCurrency"
                  value={projectData.debtCurrency}
                  onChange={handleCurrencyChange}
                  className="w-full p-2 border rounded text-black mt-2"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-[#7ebaba] text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleProjectSubmit}
          >
            Save Project
          </button>
        </form>
      </CustomModal>
      </>
  )
}

export default ProjectForm