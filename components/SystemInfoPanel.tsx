
import React from 'react';
import { SystemInfo } from '../types';
import InfoItem from './InfoItem';

interface SystemInfoPanelProps extends SystemInfo {}

const SystemInfoPanel: React.FC<SystemInfoPanelProps> = ({ 
  modelName, 
  gpuStatus, 
  serverCommTime, 
  serverResponseTime, 
  predictedWaypoints 
}) => {
  return (
    <div className="flex flex-col gap-1 h-full">
      <h3 className="text-lg font-semibold text-sky-400 mb-3 border-b border-slate-700 pb-2">System Status</h3>
      <InfoItem label="Model Name" value={modelName} highlight valueClassName="truncate max-w-[150px] sm:max-w-[200px]" />
      <InfoItem label="GPU" value={gpuStatus} valueClassName="truncate max-w-[150px] sm:max-w-[200px]" />
      <InfoItem label="Server Comm. Time" value={serverCommTime} unit="ms" />
      <InfoItem label="Server Resp. Time" value={serverResponseTime} unit="ms" />
      <InfoItem label="Predicted Waypoints" value={predictedWaypoints} valueClassName="text-xs font-mono truncate max-w-[150px] sm:max-w-[200px]" />
    </div>
  );
};

export default SystemInfoPanel;
    