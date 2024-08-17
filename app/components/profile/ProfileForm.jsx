"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomModal from "../CustomModal";
import "../../globals.css";

const ProfileForm = () => {
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
  const [inputUsername, setInputUsername] = useState("");
  const username = "any"; // Replace with the actual username
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
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: file,
          profilePicturePreview: reader.result, // Save the preview separately
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
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
  const handleCertificationTextChange = (index, text) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index].text = text;
    setFormData((prevData) => ({
      ...prevData,
      certifications: updatedCertifications,
    }));
  };
  const handleSaveCertification = (index) => {
    const certification = formData.certifications[index];
    setSavedCertifications((prevCerts) => [...prevCerts, certification]);
    removeCertification(index);
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
  const handleSkillsChange = (skills) => {
    setFormData((prevData) => ({ ...prevData, skills }));
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
  const saveChanges = () => {
    alert("Changes saved sucessfully!");
  };
  return (
    <>
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
          <label className="block text-[#6a9696] text-2xl">Experience</label>
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
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
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
          <label className="block text-[#6a9696] text-2xl mb-2">Skills</label>
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
    </>
  );
};

export default ProfileForm;
