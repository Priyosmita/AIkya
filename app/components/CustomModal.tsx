// CustomModal.tsx
import React from 'react';
import { ImCancelCircle } from "react-icons/im";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-h-[80vh] w-100 overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-4 text-[#433f3f] text-2xl rounded-full">
        <ImCancelCircle />
        </button>
        {children}
      </div>
    </div>
  );
};


export default CustomModal;