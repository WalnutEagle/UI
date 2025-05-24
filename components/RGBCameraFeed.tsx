
import React from 'react';
import Panel from './Panel';

const RGBCameraFeed: React.FC = () => {
  return (
    <Panel title="RGB Camera Feed" className="h-full flex flex-col">
      <div className="aspect-[4/3] bg-black rounded overflow-hidden flex-grow">
        <img 
          src="https://picsum.photos/seed/vehiclecam/800/600" 
          alt="RGB Camera Feed" 
          className="w-full h-full object-cover" 
        />
      </div>
    </Panel>
  );
};

export default RGBCameraFeed;
    