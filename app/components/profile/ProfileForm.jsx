"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../globals.css";


const ProfileForm = () => {
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
  const [skillInput, setSkillInput] = useState("");


  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {
        const userId = "validUserId123"; // Replace with the actual userId you want to fetch
        const profileResponse = await axios.get(
          `http://localhost:5000/api/profile?userId=${userId}`
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
    const form = new FormData();


    form.append("name", formData.name);
    form.append("about", formData.about);
    form.append("experience", formData.experience);


    // Convert skills array to JSON string before sending
    form.append("skills", JSON.stringify(formData.skills));


    if (formData.profilePicture) {
      form.append("profilePicture", formData.profilePicture);
    }


    formData.certifications.forEach((cert, index) => {
      form.append(`certifications[${index}]`, cert.file);
      form.append(`certificationsText[${index}]`, cert.text);
    });


    try {
      const response = await axios.post(
        "http://localhost:5000/api/profile",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };


  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleCertificationUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const fileURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        certifications: [
          ...prevData.certifications,
          {
            file,
            preview: fileURL,
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
    alert("Changes saved successfully!");
  };


  return (
    <>
      <h2 className="text-[#7ebaba] text-6xl mb-6 text-center">
        Profile Details
      </h2>
      <form className="space-y-8" onSubmit={handleProfileSubmit}>
        <div className="flex justify-start mb-8">
          <div className="relative w-40 h-40 rounded-full border-2 border-[#6a9696] flex items-center justify-center overflow-hidden">
            {formData.profilePicturePreview ? (
              <img
                src={formData.profilePicturePreview}
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
            <div className="border border-gray-100 rounded-lg p-2 flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-[#f9bf9a] text-white text-lg py-1 px-2 rounded-xl flex items-center"
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
          className="bg-[#7ebaba] text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-[#f9bf9a] hover:scale-110 transform transition duration-200"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </form>
    </>
  );
};


export default ProfileForm