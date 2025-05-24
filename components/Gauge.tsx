
import React from 'react';
import { GaugeProps } from '../types';

const Gauge: React.FC<GaugeProps> = ({
  label,
  value,
  minValue = 0,
  maxValue = 100,
  unit,
  size = 120, // Diameter of the gauge
}) => {
  const radius = size / 2 - 10; // 10 for padding/stroke
  const circumference = 2 * Math.PI * radius;
  const range = maxValue - minValue;
  const valuePercentage = Math.max(0, Math.min(1, (value - minValue) / range));
  
  // Gauge arc is typically not a full circle, e.g., 270 degrees starting from bottom-left
  const angleOffset = -225; // Start angle in degrees (-90 is top, -180 is left, -225 is bottom-left-ish)
  const angleRange = 270; // Total sweep angle
  const angle = angleOffset + valuePercentage * angleRange;

  const needleLength = radius * 0.8;
  const needlePath = `M ${size/2},${size/2} L ${size/2 + needleLength * Math.cos(angle * Math.PI / 180)},${size/2 + needleLength * Math.sin(angle * Math.PI / 180)}`;

  // Arc path
  const startAngleRad = angleOffset * Math.PI / 180;
  const endAngleRad = (angleOffset + angleRange) * Math.PI / 180;

  const arcStartX = size/2 + radius * Math.cos(startAngleRad);
  const arcStartY = size/2 + radius * Math.sin(startAngleRad);
  const arcEndX = size/2 + radius * Math.cos(endAngleRad);
  const arcEndY = size/2 + radius * Math.sin(endAngleRad);
  
  const largeArcFlag = angleRange <= 180 ? "0" : "1";

  const backgroundArcPath = `M ${arcStartX} ${arcStartY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}`;

  return (
    <div className="flex flex-col items-center text-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <path
          d={backgroundArcPath}
          stroke="#334155" // navy-light
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Value track */}
         <path
          d={backgroundArcPath}
          stroke="#38BDF8" // accent-blue
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference * (1 - (valuePercentage * (angleRange/360))), // this is a bit off for partial arc
            // A simpler way for partial arc: just draw a segment
          }}
        />
        {/* TODO: A better way to show value on partial arc: dynamically calculate end point for value arc */}

        {/* Needle */}
        <path d={needlePath} stroke="#E2E8F0" strokeWidth="2" fill="none" /> {/* slate-200 */}
        <circle cx={size/2} cy={size/2} r="4" fill="#E2E8F0" />

        {/* Min/Max Labels (simplified) */}
        <text x={size * 0.2} y={size * 0.85} textAnchor="middle" fontSize="10" fill="#94A3B8">{minValue}</text>
        <text x={size * 0.8} y={size * 0.85} textAnchor="middle" fontSize="10" fill="#94A3B8">{maxValue}</text>
        
        {/* Current Value */}
        <text x={size/2} y={size/2 + 25} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#F1F5F9">
          {value.toFixed(0)}
        </text>
      </svg>
      <span className="text-sm text-light-gray mt-1">{label}</span>
      <span className="text-xs text-medium-gray">{unit}</span>
    </div>
  );
};

export default Gauge;
    