
import React from 'react';
import { PanelProps } from '../types';

const Panel: React.FC<PanelProps> = ({ title, titleColor = 'text-accent-blue', icon, children, className = '' }) => {
  return (
    <div className={`bg-navy-medium p-4 sm:p-6 rounded-lg shadow-lg ${className}`}>
      {title && (
        <div className="flex items-center mb-4">
          {icon && <span className="mr-2 text-accent-blue">{icon}</span>}
          <h2 className={`text-lg font-semibold ${titleColor}`}>{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default Panel;
    