"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "../../globals.css";
import CustomModal from "@/app/components/CustomModal";
import { SignOutButton } from "@clerk/nextjs";
import axios from "axios";

const ProfileDetailsPage = () => {
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
  const [skillInput, setSkillInput] = useState("");
  const [savedCertifications, setSavedCertifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState('');
  const username = "any"; // Replace with the actual username

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

  const handleCertificationUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileURL = URL.createObjectURL(file); // Create a URL for the file
      setFormData((prevData) => ({
        ...prevData,
        certifications: [
          ...prevData.certifications,
          {
            file,
            preview: fileURL, // Store the URL for preview
            text: "",
          },
        ],
      }));
    });
  };

  const handleSkillsChange = (skills) => {
    setFormData((prevData) => ({ ...prevData, skills }));
  };
  const handleSaveCertification = (index) => {
    const certification = formData.certifications[index];
    setSavedCertifications((prevCerts) => [...prevCerts, certification]);
    removeCertification(index);
  };

  const handleCertificationTextChange = (index, text) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index].text = text;
    setFormData((prevData) => ({
      ...prevData,
      certifications: updatedCertifications,
    }));
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      handleSkillsChange([...formData.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    handleSkillsChange(formData.skills.filter((_, i) => i !== index));
  };

  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== index
    );
    setFormData((prevData) => ({
      ...prevData,
      certifications: updatedCertifications,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        localStorage.setItem('profilePicture', imageData);
      };
      reader.readAsDataURL(file);
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
    try {
      const response = await axios.post(
        "http://localhost:5000/api/project",
        projectData
      );
      const project = response.data;
      setProjects((prevProjects) => [...prevProjects, project]);
      setProjectData({
        name: "",
        website: "",
        type: "",
        industry: "",
        details: "",
        images: null,
      });
      setModalIsOpen(false);
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
      alert('Account deleted successfully!');
      setIsModalOpen(false);
      // Add your account deletion logic here
    } else {
      alert('Username does not match!');
    }
  };

  const saveChanges = () => {
    alert('Changes saved sucessfully!');
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputUsername(''); // Clear the input field when closing the modal
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bgGradient flex flex-col items-center py-10">
        <div className="bg-white bg-opacity-0 rounded-2xl p-8 w-3/4 pt-32 gap-y-7">
          <h2 className="text-[#7ebaba] text-6xl mb-6 text-center">
            Profile Details
          </h2>
          <form className="space-y-8" onSubmit={handleProfileSubmit}>
            <div className="flex justify-start mb-8">
              <div className="relative w-40 h-40 rounded-full border-2 border-[#6a9696] flex items-center justify-center overflow-hidden">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <span className="text-4xl text-[#6a9696]">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[#6a9696] text-2xl">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">
                Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">
                Certifications
              </label>
              <input
                type="file"
                multiple
                onChange={handleCertificationUpload}
                className="w-full p-2 border rounded text-black"
              />
              {formData.certifications.map((certification, index) => (
                <div key={index} className="flex items-center mt-2">
                  <a
                    href={certification.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    {certification.file.type.includes("image") ? (
                      <img
                        src={certification.preview}
                        alt={`Certification ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : certification.file.type === "application/pdf" ? (
                      <div className="text-black">
                        <object
                          data={certification.preview}
                          type="application/pdf"
                          width="100"
                          height="100"
                        >
                          <embed
                            src={certification.preview}
                            type="application/pdf"
                          />
                        </object>
                      </div>
                    ) : (
                      <div className="text-black">Preview not available</div>
                    )}
                  </a>
                  <input
                    type="text"
                    placeholder="Add a description"
                    value={certification.text}
                    onChange={(e) =>
                      handleCertificationTextChange(index, e.target.value)
                    }
                    className="ml-4 p-2 border rounded text-black flex-grow"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveCertification(index)}
                    className="ml-4 bg-[#7ebaba] text-white py-2 px-5 rounded hover:bg-[#55aeae] transition duration-150"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="ml-4 bg-[#ffbc93] text-white p-2 rounded hover:bg-[#ffa066] transition duration-150"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {savedCertifications.map((certification, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <a
                      href={URL.createObjectURL(certification.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {certification.file.type.includes("image") ? (
                        <img
                          src={URL.createObjectURL(certification.file)}
                          alt={`Certification ${index + 1}`}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                      ) : certification.file.type === "application/pdf" ? (
                        <object
                          data={URL.createObjectURL(certification.file)}
                          type="application/pdf"
                          width="100%"
                          height="200"
                        >
                          <embed
                            src={URL.createObjectURL(certification.file)}
                            type="application/pdf"
                          />
                        </object>
                      ) : (
                        <div className="text-black">Preview not available</div>
                      )}
                    </a>
                    <p className="text-[#6a9696] mt-2">{certification.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#6a9696] text-2xl mb-2">
                Skills
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className="p-2 h-14 focus:outline-none rounded text-black"
                />
                <div className="border rounded p-2 flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-[#f8c3a2] text-white py-1 px-2 rounded flex items-center"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="ml-2 text-lg"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#7ebaba] text-white font-bold py-2 px-4 rounded hover:bg-[#f9bf9a] hover:scale-110 tranform transition duration-300"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </form>

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
        </div>
        <div className="flex flex-row gap-x-28 pb-9">
          <SignOutButton>
            <button className="hover:scale-110 tranform transition duration-300 mt-4 bg-[#7ebaba] text-white font-bold py-2 px-4 rounded">
              Sign Out
            </button>
          </SignOutButton>

          <button
            onClick={handleOpenModal}
            className="hover:scale-110 tranform transition duration-300 mt-4 bg-[#f66666] text-white font-bold py-2 px-4 rounded"
          >
            Delete Account
          </button>

          <div className="flex flex-col items-center justify-center p-4">
            {isModalOpen && (
              <div className="text-black fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <h2 className="text-2xl font-semibold mb-4 text-center">Confirm Account Deletion</h2>
                  <p className="mb-4 text-center">This project will be deleted, along with all of its Credentials, Details, Fundings, Donations, Promotions.</p>
                  <p className="mb-4 text-center">Please type your username to confirm:</p>
                  <input
                    type="text"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                  />
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleDeleteAccount}
                      className="bg-[#f66666] text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete Account
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
      <Footer />
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
            <label className="block text-[#6a9696] text-xl">EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)</label>
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
            <label className="block text-[#6a9696] text-xl">SKU (Stock Keeping Unit)</label>
            <input
              type="number"
              name="skus"
              value={projectData.skus}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Funding Required</label>
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
              Debt Accept or Not
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
  );
};

export default ProfileDetailsPage;
