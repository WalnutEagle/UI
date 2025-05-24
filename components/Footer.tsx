
import React from 'react';

const PowerIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-auto">
      <button 
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-150"
        onClick={() => alert('Quit Session clicked!')}
      >
        <PowerIcon />
        Quit Session
      </button>
    </footer>
  );
};

export default Footer;
    