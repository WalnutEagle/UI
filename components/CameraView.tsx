
import React from 'react';

interface CameraViewProps {
  imageSrc: string;
  altText: string;
  title: string;
}

const CameraView: React.FC<CameraViewProps> = ({ imageSrc, altText, title }) => {
  return (
    <div className="bg-slate-850 rounded-lg shadow-inner h-full flex flex-col overflow-hidden">
      <h3 className="text-md font-semibold text-slate-300 p-3 bg-slate-700/50 text-center">{title}</h3>
      <div className="flex-grow relative bg-black">
        <img 
          src={imageSrc} 
          alt={altText} 
          className="object-cover w-full h-full" 
        />
      </div>
    </div>
  );
};

export default CameraView;
    