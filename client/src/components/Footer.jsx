import React from 'react';
import { FaGithub, FaLinkedinIn, FaConnectdevelop } from 'react-icons/fa';
import {CgMail} from 'react-icons/cg'
const Footer = () => {
  return (
    <footer className=" bg-blue-500 text-white text-center my-4 p-4">
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
