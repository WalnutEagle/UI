import React, { useState } from 'react';
import Button from './Button'; // Assuming Button component is in ../Button
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface SteeringThrottleViewProps {
  steeringAngle: number; // degrees, e.g., -45 to 45
  throttleLevel: number; // percentage, 0 to 100
}

const SteeringThrottleView: React.FC<SteeringThrottleViewProps> = ({ steeringAngle, throttleLevel }) => {
  const [showNumericValues, setShowNumericValues] = useState(false);

  const gaugeSize = 140; // SVG canvas size
  const radius = 55; // Main radius of the dial
  const needleLength = 42;
  const center = gaugeSize / 2;

  // Steering Gauge: -45deg (left) to +45deg (right), 0deg is up
  const limitedSteeringAngle = Math.max(-45, Math.min(45, steeringAngle));
  const steeringRotation = limitedSteeringAngle; 
  const steeringTicks = [
    { angle: -45, label: "-45°" },
    { angle: -22.5, label: "" },
    { angle: 0, label: "0", major: true },
    { angle: 22.5, label: "" },
    { angle: 45, label: "45°" },
  ];

  // Throttle Gauge: 0% to 100% over a 270-degree sweep
  // 0% -> -135deg from up, 50% -> 0deg (up), 100% -> 135deg from up
  const throttleSweepAngle = 270;
  const throttleStartAngle = -throttleSweepAngle / 2; // -135 deg from 'up'
  const limitedThrottleLevel = Math.max(0, Math.min(100, throttleLevel));
  const throttleRotation = (limitedThrottleLevel / 100) * throttleSweepAngle + throttleStartAngle;
  
  const throttleTicks = [
    { value: 0, label: "0" },   // angle: -135
    { value: 25, label: "25" },  // angle: -67.5
    { value: 50, label: "50", major: true }, // angle: 0
    { value: 75, label: "75" },  // angle: 67.5
    { value: 100, label: "100" } // angle: 135
  ].map(tick => ({
    ...tick,
    angle: (tick.value / 100) * throttleSweepAngle + throttleStartAngle
  }));

  const renderTicks = (ticks: Array<{angle: number, label?: string, major?: boolean}>, colorClass: string) => {
    return ticks.map(tick => (
      <g key={`tick-${tick.label}-${tick.angle}`} transform={`rotate(${tick.angle}, ${center}, ${center})`}>
        <line 
          x1={center + radius - (tick.major ? 10 : 6)} y1={center} 
          x2={center + radius -1} y2={center} 
          className={`stroke-current ${colorClass === 'text-slate-400' ? 'text-slate-500' : colorClass.replace('text-', 'stroke-') } opacity-75`}
          strokeWidth={tick.major ? 1.5 : 1} 
        />
        {tick.label && (
          <text
            x={center + radius - (tick.major ? (tick.label.length > 2 ? 22 : 18) : 15) } 
            y={center}
            dominantBaseline="middle"
            textAnchor="middle"
            transform={`rotate(${-tick.angle + 90}, ${center + radius - (tick.major ? (tick.label.length > 2 ? 22 : 18) : 15)}, ${center})`}
            className={`text-[9px] fill-current ${colorClass}`}
          >
            {tick.label}
          </text>
        )}
      </g>
    ));
  };

  const toggleShowNumericValues = () => {
    setShowNumericValues(prev => !prev);
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-sky-400 mb-3 text-center border-b border-slate-700 pb-2">Vehicle Control</h3>
      <div className="flex-grow flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-2 sm:gap-3 py-2 px-1">
        {/* Steering Gauge */}
        <div className="text-center flex flex-col items-center p-1 flex-1">
          <p className="text-sm text-slate-400 mb-1">Steering</p>
          <svg width={gaugeSize} height={gaugeSize} viewBox={`0 0 ${gaugeSize} ${gaugeSize}`} className="transform -rotate-90 overflow-visible">
            <circle cx={center} cy={center} r={radius} className="fill-slate-800 stroke-slate-600" strokeWidth="1.5" />
            {renderTicks(steeringTicks, 'text-slate-400')}
            <line
              x1={center} y1={center}
              x2={center + needleLength} y2={center}
              className="stroke-sky-400" strokeWidth="2.5" strokeLinecap="round"
              transform={`rotate(${steeringRotation}, ${center}, ${center})`}
            />
            <circle cx={center} cy={center} r="4" className="fill-sky-500 stroke-slate-900" strokeWidth="1"/>
          </svg>
          <div className="h-7 mt-2"> {/* Placeholder for height consistency */}
            {showNumericValues && (
              <p className="text-xl font-bold text-sky-400 font-mono tabular-nums">
                {Math.abs(limitedSteeringAngle).toFixed(1)}° 
                <span className="text-base font-medium">{limitedSteeringAngle > 0.1 ? ' R' : limitedSteeringAngle < -0.1 ? ' L' : ''}</span>
              </p>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center justify-center py-2 sm:py-0 sm:self-center">
          <Button 
            onClick={toggleShowNumericValues} 
            variant="ghost" 
            size="sm" 
            className="!p-2 !rounded-full aspect-square"
            aria-label={showNumericValues ? "Hide numeric values" : "Show numeric values"}
          >
            {showNumericValues ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Throttle Gauge */}
        <div className="text-center flex flex-col items-center p-1 flex-1">
          <p className="text-sm text-slate-400 mb-1">Throttle</p>
          <svg width={gaugeSize} height={gaugeSize} viewBox={`0 0 ${gaugeSize} ${gaugeSize}`} className="transform -rotate-90 overflow-visible">
             <circle cx={center} cy={center} r={radius} className="fill-slate-800 stroke-slate-600" strokeWidth="1.5" />
            {renderTicks(throttleTicks, 'text-slate-400')}
            <line
              x1={center} y1={center}
              x2={center + needleLength} y2={center}
              className="stroke-green-400" strokeWidth="2.5" strokeLinecap="round"
              transform={`rotate(${throttleRotation}, ${center}, ${center})`}
            />
            <circle cx={center} cy={center} r="4" className="fill-green-500 stroke-slate-900" strokeWidth="1"/>
          </svg>
          <div className="h-7 mt-2"> {/* Placeholder for height consistency */}
            {showNumericValues && (
              <p className="text-xl font-bold text-green-400 font-mono tabular-nums">
                {limitedThrottleLevel.toFixed(0)}%
              </p>
            )}
          </div>
        </div>
      </div>
       <p className="mt-auto pt-2 text-xs text-slate-500 text-center">
        Toggle values with the eye icon.
      </p>
    </div>
  );
};

export default SteeringThrottleView;
