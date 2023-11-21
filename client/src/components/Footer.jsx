import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [backgroundColorClass, setBackgroundColorClass] = useState('bg-white'); // Default background color

  useEffect(() => {
    // Function to update the background color based on the path
    const updateBackgroundColor = () => {
      if (location.pathname === "/") {
        setBackgroundColorClass('bg-jobPageBlue'); 
      } else if (location.pathname.startsWith("/jobs")) {
        setBackgroundColorClass('bg-sky-600');
      } else if (location.pathname === "/addJob"){
        setBackgroundColorClass('bg-sky-600');
      } else if (location.pathname === "/login" || location.pathname === "/signup") {
        setBackgroundColorClass('bg-jobPageBlue')
      }
    };

    updateBackgroundColor();
  }, [location]);

  return (
    <footer className={`${backgroundColorClass} text-black text-center  p-4`}>
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
