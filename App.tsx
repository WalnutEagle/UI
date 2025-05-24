
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SystemStatus from './components/SystemStatus';
import SensorOutput from './components/SensorOutput';
import RealWorldCarInterface from './components/RealWorldCarInterface';
import CarEnergyConsumption from './components/CarEnergyConsumption';
import RGBCameraFeed from './components/RGBCameraFeed';
import VehicleControl from './components/VehicleControl';
import Footer from './components/Footer';
import { SystemStatusData, SensorOutputData, CarEnergyConsumptionData } from './types';

const initialSystemStatus: SystemStatusData = {
  modelName: 'VisionPilotNet-XL',
  gpu: 'NVIDIA Jetson AGX Orin',
  serverCommTime: 17.72,
  serverRespTime: 55.61,
  predictedWaypoints: '[(34.1,-118.2),(34.2,-118.2)...]',
};

const initialSensorOutput: SensorOutputData = {
  gpsCoordinates: '34.0522° N, 118.2437° W',
  velocity: 43.10,
};

const initialEnergyConsumption: CarEnergyConsumptionData = {
  currentOutput: 839,
};

const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 mr-2 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
    </svg>
);


const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [systemStatus, setSystemStatus] = useState<SystemStatusData>(initialSystemStatus);
  const [sensorOutput, setSensorOutput] = useState<SensorOutputData>(initialSensorOutput);
  const [energyConsumption, setEnergyConsumption] = useState<CarEnergyConsumptionData>(initialEnergyConsumption);
  const [steeringAngle, setSteeringAngle] = useState<number>(15); // Initial angle
  const [throttlePercentage, setThrottlePercentage] = useState<number>(60); // Initial percentage

  const updateData = useCallback(() => {
    setSystemStatus(prev => ({
      ...prev,
      serverCommTime: 15 + Math.random() * 5, // 15-20
      serverRespTime: 50 + Math.random() * 10, // 50-60
    }));
    setSensorOutput(prev => ({
      ...prev,
      velocity: 40 + Math.random() * 10, // 40-50
      gpsCoordinates: `34.${Math.floor(Math.random()*10000)}° N, 118.${Math.floor(Math.random()*10000)}° W`
    }));
    setEnergyConsumption({
      currentOutput: 800 + Math.random() * 100, // 800-900
    });
    setSteeringAngle(Math.random() * 90 - 45); // -45 to 45
    setThrottlePercentage(Math.random() * 100); // 0 to 100
  }, []);

  useEffect(() => {
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const dataTimer = setInterval(updateData, 3000); // Update data every 3 seconds

    return () => {
      clearInterval(timeTimer);
      clearInterval(dataTimer);
    };
  }, [updateData]);


  return (
    <div className="min-h-screen flex flex-col bg-navy-deep">
      <Header currentTime={currentTime} />
      <main className="flex-grow p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-screen-2xl mx-auto w-full">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <SystemStatus data={systemStatus} />
          <SensorOutput data={sensorOutput} />
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <button className="w-full bg-accent-blue hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-150">
            <VideoIcon />
            Switch to Depth View
          </button>
          <RealWorldCarInterface />
          <CarEnergyConsumption data={energyConsumption} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex-grow min-h-[300px] sm:min-h-[400px]">
             <RGBCameraFeed />
          </div>
          <div className="min-h-[250px] sm:min-h-[300px]">
            <VehicleControl steeringAngle={steeringAngle} throttlePercentage={throttlePercentage} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
    