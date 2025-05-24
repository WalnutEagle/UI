
import React from 'react';
import Panel from './Panel';

const RealWorldCarInterface: React.FC = () => {
  return (
    <Panel title="Real World Car Interface" titleColor="text-slate-100">
      <p className="text-sm text-light-gray">
        This panel represents the operational status and communication link with the vehicle's hardware. Currently in simulated mode.
      </p>
    </Panel>
  );
};

export default RealWorldCarInterface;
    