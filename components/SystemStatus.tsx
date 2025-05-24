
import React from 'react';
import { SystemStatusData } from '../types';
import Panel from './Panel';

interface SystemStatusProps {
  data: SystemStatusData;
}

const SystemStatusItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between py-2 border-b border-navy-light last:border-b-0">
    <span className="text-light-gray">{label}:</span>
    <span className="text-slate-100 font-medium text-right">
      {value} {unit && <span className="text-xs text-medium-gray">{unit}</span>}
    </span>
  </div>
);

const SystemStatus: React.FC<SystemStatusProps> = ({ data }) => {
  return (
    <Panel title="System Status">
      <div className="space-y-1 text-sm">
        <SystemStatusItem label="Model Name" value={data.modelName} />
        <SystemStatusItem label="GPU" value={data.gpu} />
        <SystemStatusItem label="Server Comm. Time" value={data.serverCommTime.toFixed(2)} unit="ms" />
        <SystemStatusItem label="Server Resp. Time" value={data.serverRespTime.toFixed(2)} unit="ms" />
        <div className="flex justify-between py-2">
          <span className="text-light-gray">Predicted Waypoints:</span>
          <span className="text-slate-100 font-medium text-right truncate" title={data.predictedWaypoints}>
            {data.predictedWaypoints.length > 25 ? `${data.predictedWaypoints.substring(0, 25)}...` : data.predictedWaypoints}
          </span>
        </div>
      </div>
    </Panel>
  );
};

export default SystemStatus;
    