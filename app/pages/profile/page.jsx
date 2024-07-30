'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import CustomModal from '@/app/components/CustomModal';
import { SignOutButton } from '@clerk/nextjs';
import axios from 'axios';

const ProfileDetailsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    experience: '',
    certifications: '',
    skills: '',
    profilePicture: '',
  });

  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [projectData, setProjectData] = useState({
    name: '',
    website: '',
    type: '',
    industry: '',
    details: '',
    images: null,
  });

  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      try {
        const profileResponse = await axios.get('http://localhost:5000/api/profile');
        if (profileResponse.data) {
          setFormData(profileResponse.data);
        }
        const projectResponse = await axios.get('http://localhost:5000/api/projects');
        setProjects(projectResponse.data);
      } catch (error) {
        console.error('There was an error fetching profile and projects!', error);
      }
    };
    fetchProfileAndProjects();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/profile', formData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
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
        setFormData((prevData) => ({ ...prevData, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectChange = (e) => {
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
      const response = await axios.post('http://localhost:5000/api/project', projectData);
      const project = response.data;
      setProjects((prevProjects) => [...prevProjects, project]);
      setProjectData({
        name: '',
        website: '',
        type: '',
        industry: '',
        details: '',
        images: null,
      });
      setModalIsOpen(false);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setProjectData({
      name: '',
      website: '',
      type: '',
      industry: '',
      details: '',
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
      console.error('There was an error!', error);
    }
  };

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bgGradient flex flex-col items-center py-10">
        <div className="bg-white bg-opacity-0 rounded-2xl p-8 w-3/4 pt-32 gap-y-7">
          <h2 className="text-[#7ebaba] text-5xl mb-6 text-center">Profile Details</h2>
          <form className="space-y-8" onSubmit={handleProfileSubmit}>
          <div className="flex justify-start mb-8">
  <div className="relative w-40 h-40 rounded-full border-2 border-[#6a9696] flex items-center justify-center overflow-hidden">
    
      <label className="flex flex-col items-center justify-center cursor-pointer">
        <span className="text-4xl text-[#6a9696]">+</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
    
  </div>
</div>

            <div>
              <label className="block text-[#6a9696] text-2xl">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">Certifications</label>
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              ></textarea>
            </div>
            <div>
              <label className="block text-[#6a9696] text-2xl">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#7ebaba] text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>

          <h2 className="text-[#7ebaba] text-4xl mt-12 mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="relative bg-white bg-opacity-30 rounded-lg shadow-md p-4">
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
        <SignOutButton>
          <button className="mt-4 bg-[#7ebaba] text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </SignOutButton>
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
            <label className="block text-[#6a9696] text-xl">Project Website</label>
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
            <input
              type="text"
              name="type"
              value={projectData.type}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Industry</label>
            <input
              type="text"
              name="industry"
              value={projectData.industry}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Project Details</label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            ></textarea>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Upload Images</label>
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
          >
            Save Project
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default ProfileDetailsPage;
