
import React from 'react';
import { SensorData } from '../types';
import InfoItem from './InfoItem';

interface SensorDataPanelProps {
  sensorData: SensorData;
}

const SensorDataPanel: React.FC<SensorDataPanelProps> = ({ sensorData }) => {
  return (
    <div className="flex flex-col gap-1 h-full">
      <h3 className="text-lg font-semibold text-sky-400 mb-3 border-b border-slate-700 pb-2">Sensor Output</h3>
      <InfoItem label="GPS Coordinates" value={sensorData.gps} valueClassName="text-xs font-mono" />
      <InfoItem label="Velocity" value={sensorData.velocity} unit="km/h" highlight />
    </div>
  );
};

export default SensorDataPanel;
    