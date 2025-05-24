
import React from 'react';
import { SensorOutputData } from '../types';
import Panel from './Panel';

interface SensorOutputProps {
  data: SensorOutputData;
}

const SensorOutputItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between py-2 border-b border-navy-light last:border-b-0">
    <span className="text-light-gray">{label}:</span>
    <span className="text-slate-100 font-medium text-right">
      {value} {unit && <span className="text-xs text-medium-gray">{unit}</span>}
    </span>
  </div>
);

const SensorOutput: React.FC<SensorOutputProps> = ({ data }) => {
  return (
    <Panel title="Sensor Output">
      <div className="space-y-1 text-sm">
        <SensorOutputItem label="GPS Coordinates" value={data.gpsCoordinates} />
        <SensorOutputItem label="Velocity" value={data.velocity.toFixed(2)} unit="km/h" />
      </div>
    </Panel>
  );
};

export default SensorOutput;
    