'use client'
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../../globals.css';
import Modal from 'react-modal';

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
  const [projectData, setProjectData] = useState({
    name: '',
    website: '',
    type: '',
    industry: '',
    details: '',
    images: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    setProjects((prevProjects) => [...prevProjects, projectData]);
    setProjectData({
      name: '',
      website: '',
      type: '',
      industry: '',
      details: '',
      images: '',
    });
    setModalIsOpen(false);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <Header />
      <div className='min-h-screen bgGradient flex flex-col items-center py-10'>
        <div className='bg-white bg-opacity-30 rounded-2xl shadow-lg p-8 w-3/4'>
          <h2 className='text-[#7ebaba] text-4xl mb-6'>Profile Details</h2>
          <form className='space-y-4'>
            <div>
              <label className='block text-gray-700'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              />
            </div>
            <div>
              <label className='block text-gray-700'>About</label>
              <textarea
                name='about'
                value={formData.about}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              ></textarea>
            </div>
            <div>
              <label className='block text-gray-700'>Experience</label>
              <textarea
                name='experience'
                value={formData.experience}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              ></textarea>
            </div>
            <div>
              <label className='block text-gray-700'>Certifications</label>
              <textarea
                name='certifications'
                value={formData.certifications}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              ></textarea>
            </div>
            <div>
              <label className='block text-gray-700'>Skills</label>
              <textarea
                name='skills'
                value={formData.skills}
                onChange={handleChange}
                className='w-full p-2 border rounded'
              ></textarea>
            </div>
          </form>
          <h3 className='text-[#7ebaba] text-3xl mt-10 mb-4'>Projects</h3>
          <div className='flex flex-wrap gap-4'>
            {projects.map((project, index) => (
              <div key={index} className='w-40 h-40 bg-white bg-opacity-30 rounded-lg shadow-md p-4'>
                <h4 className='text-lg font-bold'>{project.name}</h4>
                <p>{project.type}</p>
              </div>
            ))}
            <div
              className='w-40 h-40 bg-white bg-opacity-30 rounded-lg shadow-md flex items-center justify-center cursor-pointer'
              onClick={openModal}
            >
              <span className='text-5xl text-gray-700'>+</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Add Project'
        className='Modal'
        overlayClassName='Overlay'
      >
        <h2 className='text-3xl mb-4'>Add Project</h2>
        <form onSubmit={handleProjectSubmit} className='space-y-4'>
          <div>
            <label className='block text-gray-700'>Project Name</label>
            <input
              type='text'
              name='name'
              value={projectData.name}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Website</label>
            <input
              type='text'
              name='website'
              value={projectData.website}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Type</label>
            <input
              type='text'
              name='type'
              value={projectData.type}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Industry</label>
            <input
              type='text'
              name='industry'
              value={projectData.industry}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Details</label>
            <textarea
              name='details'
              value={projectData.details}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            ></textarea>
          </div>
          <div>
            <label className='block text-gray-700'>Images</label>
            <input
              type='text'
              name='images'
              value={projectData.images}
              onChange={handleProjectChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <button
            type='submit'
            className='bg-[#7ebaba] text-white font-bold py-2 px-4 rounded'
          >
            Add Project
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileDetailsPage;
