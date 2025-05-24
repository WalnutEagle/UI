
import React from 'react';
import { InfoItemProps } from '../types';

const InfoItem: React.FC<InfoItemProps> = ({ label, value, unit, highlight = false, valueClassName = "" }) => (
  <div className={`py-2.5 border-b border-slate-700 last:border-b-0 ${highlight ? 'bg-slate-700/30 px-3 -mx-3 rounded-md' : 'px-1'}`}>
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-400">{label}:</span>
      <span className={`font-medium ${highlight ? 'text-sky-300' : 'text-slate-200'} ${valueClassName}`}>
        {value} {unit && <span className="text-xs ml-1 text-slate-500">{unit}</span>}
      </span>
    </div>
  </div>
);

export default InfoItem;
    