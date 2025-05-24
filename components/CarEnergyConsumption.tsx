
import React from 'react';
import { CarEnergyConsumptionData } from '../types';
import Panel from './Panel';

interface CarEnergyConsumptionProps {
  data: CarEnergyConsumptionData;
}

const BoltIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

const CarEnergyConsumption: React.FC<CarEnergyConsumptionProps> = ({ data }) => {
  return (
    <Panel 
      title="Car Energy Consumption Data" 
      icon={<BoltIcon className="text-yellow-400" />}
      titleColor="text-slate-100"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-light-gray">Current Output:</span>
        <div>
          <span className="text-3xl font-bold text-yellow-400">{Math.round(data.currentOutput)}</span>
          <span className="ml-1 text-xs text-medium-gray">watts</span>
        </div>
      </div>
    </Panel>
  );
};

export default CarEnergyConsumption;
    