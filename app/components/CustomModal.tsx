// CustomModal.tsx
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import './options/options.css'

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#ffddc7] bg-opacity-85 p-6 rounded-lg shadow-lg relative max-h-[80vh] w-100 overflow-y-auto custom-scrollbar">
        <button onClick={onClose} className="absolute top-2 right-4 text-3xl text-[#6bb3b3] hover:text-[#1f6262] transform transition duration-110">
        <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;