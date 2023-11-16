import React from 'react';
import { FaGithub} from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className=" bg-white text-black text-center mt-2 p-4">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EmployEase
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/jhuber1155/EmployEase" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
