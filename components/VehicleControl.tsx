
import React from 'react';
import Panel from './Panel';
import Gauge from './Gauge';

interface VehicleControlProps {
  steeringAngle: number;
  throttlePercentage: number;
}

const EyeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-light-gray">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const VehicleControl: React.FC<VehicleControlProps> = ({ steeringAngle, throttlePercentage }) => {
  return (
    <Panel title="Vehicle Control" className="h-full flex flex-col">
      <div className="flex-grow flex items-center justify-around p-4 space-x-4">
        <Gauge label="Steering" value={steeringAngle} minValue={-45} maxValue={45} unit="°" size={140} />
        <div className="flex items-center justify-center p-2 bg-navy-light rounded-full">
           <EyeIcon />
        </div>
        <Gauge label="Throttle" value={throttlePercentage} minValue={0} maxValue={100} unit="%" size={140}/>
      </div>
      <p className="text-xs text-center text-medium-gray mt-2">Toggle values with the eye icon.</p>
    </Panel>
  );
};

export default VehicleControl;
    