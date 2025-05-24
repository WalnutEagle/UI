
import React from 'react';

interface HeaderProps {
  currentTime: string;
}

const ChipIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent-blue">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-7.5h12v-1.5h-12v1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V15m0 0H9.75M12 15h2.25M12 15v2.25M12 15V9.75M12 9.75H9.75M12 9.75h2.25M12 9.75V7.5M12 7.5h3.75v3.75H12V7.5zm0 0H8.25v3.75H12V7.5z" />
  </svg>
);

const ArrowsRightLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 6.5m0 0L16.5 11M21 6.5H3" />
  </svg>
);

const ClockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


const Header: React.FC<HeaderProps> = ({ currentTime }) => {
  return (
    <header className="bg-navy-medium p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <ChipIcon />
        <h1 className="text-xl sm:text-2xl font-bold ml-3 text-slate-100">Autonomous Vehicle Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4 text-sm text-light-gray">
        <div className="flex items-center">
          <ArrowsRightLeftIcon />
          <span className="ml-1">Mode: <span className="font-semibold text-slate-100">Cloud</span></span>
        </div>
        <div className="flex items-center">
          <ClockIcon />
          <span className="ml-1 font-semibold text-slate-100">{currentTime}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
    