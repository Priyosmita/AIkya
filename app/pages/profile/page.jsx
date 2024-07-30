'use client';
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import CustomModal from '@/app/components/CustomModal';


const ProfileDetailsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    experience: '',
    certifications: '',
    skills: '',
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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


  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = projectData;
      setProjects(updatedProjects);
      setIsEditing(false);
    } else {
      setProjects((prevProjects) => [...prevProjects, projectData]);
    }
    setProjectData({
      name: '',
      website: '',
      type: '',
      industry: '',
      details: '',
      images: null,
    });
    setModalIsOpen(false);
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


  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    setDropdownIndex(null);
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
          <form className="space-y-8">
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
          </form>
          <h3 className="text-[#6a9696] text-2xl mt-10 mb-4">Projects</h3>
          <div className="flex flex-wrap gap-4">
            {projects.map((project, index) => (
              <div key={index} className="w-40 h-40 bg-white bg-opacity-30 rounded-lg shadow-md p-4 relative">
                <h4 className="text-lg font-bold text-[#6a9696]">{project.name}</h4>
                <p className="text-lg font-bold text-[#6a9696]">{project.type}</p>
                {project.images && (
                  <img src={project.images} alt={project.name} className="w-full h-20 object-cover rounded mt-2" />
                )}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="absolute top-2 right-2 bg-opacity-0 text-[#6a9696] text-3xl p-1 rounded"
                >
                  &#x22EE;
                </button>
                {dropdownIndex === index && (
                  <div className="absolute top-8 right-2 bg-white shadow-md rounded z-10">
                    <button
                      onClick={() => handleEditProject(index)}
                      className="block w-full text-left p-2 hover:bg-gray-200 text-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="block w-full text-left p-2 hover:bg-gray-200 text-black"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div
              className="w-40 h-40 bg-white bg-opacity-30 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
              onClick={openModal}
            >
              <span className="text-5xl text-[#6a9696]">+</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className="text-3xl mb-4">{isEditing ? 'Edit Project' : 'Add Project'}</h2>
        <form onSubmit={handleProjectSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Website</label>
            <input
              type="text"
              name="website"
              value={projectData.website}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={projectData.type}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Industry</label>
            <input
              type="text"
              name="industry"
              value={projectData.industry}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Details</label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
            {projectData.images && (
              <img src={projectData.images} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#7ebaba] text-white font-bold py-2 px-4 rounded"
            >
              {isEditing ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </CustomModal>
    </>
  );
};


export default ProfileDetailsPage;