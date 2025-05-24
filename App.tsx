
import React, { useState, useEffect, useCallback } from 'react';
import { InferenceMode, SensorData, SystemInfo } from './types';
import SystemInfoPanel from './components/SystemInfoPanel';
import SensorDataPanel from './components/SensorDataPanel';
import CameraView from './components/CameraView';
import SteeringThrottleView from './components/SteeringThrottleView';
import Button from './components/Button';
import { PowerIcon, VideoCameraIcon, ArrowsRightLeftIcon, ClockIcon, CpuChipIcon, BoltIcon } from '@heroicons/react/24/outline';
import InfoItem from './components/InfoItem';

// Define the list of images for the front camera gallery
// IMPORTANT: Create an 'images' folder at the root of your project (next to index.html)
// and place these image files inside it.
const galleryImages = [
  "/images/1.jpg" // Replace with your actual image filenames
  // Add more image paths here if you like
];

const App: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    modelName: "VisionPilotNet-XL",
    gpuStatus: "NVIDIA Jetson AGX Orin",
    serverCommTime: 12,
    serverResponseTime: 28,
    predictedWaypoints: "[(34.1, -118.2), (34.2, -118.3)]",
  });

  const [sensorData, setSensorData] = useState<SensorData>({
    gps: "34.0522° N, 118.2437° W",
    velocity: 45,
  });

  const [inferenceMode, setInferenceMode] = useState<InferenceMode>(InferenceMode.CLOUD);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}));
  const [isDepthView, setIsDepthView] = useState<boolean>(false);
  
  const [steeringAngle, setSteeringAngle] = useState<number>(0);
  const [throttleLevel, setThrottleLevel] = useState<number>(0);
  const [carEnergyConsumption, setCarEnergyConsumption] = useState<number>(20); // Watts

  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);

  // Use a placeholder for depth view, or you can set it to a specific local image if you prefer
  const depthImageSrc = "https://picsum.photos/seed/depthview/800/450?grayscale&blur=2"; 
  
  // The front image source will now come from our cycling gallery
  const frontImageSrc = galleryImages[currentGalleryIndex];

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}));
      
      // Cycle through gallery images for the front view
      setCurrentGalleryIndex(prevIndex => (prevIndex + 1) % galleryImages.length);

      // Simulate other data updates
      setSensorData(prev => ({
        ...prev,
        velocity: Math.max(0, Math.min(120, prev.velocity + (Math.random() - 0.5) * 5)),
      }));
      setSystemInfo(prev => ({
        ...prev,
        serverCommTime: Math.max(5, Math.min(50, prev.serverCommTime + (Math.random() - 0.5) * 3)),
        serverResponseTime: Math.max(10, Math.min(100, prev.serverResponseTime + (Math.random() - 0.5) * 5)),
      }));
      setSteeringAngle(prev => Math.max(-45, Math.min(45, prev + (Math.random() - 0.5) * 10)));
      setThrottleLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 20)));
      setCarEnergyConsumption(prev => Math.max(100, Math.min(2000, prev + (Math.random() - 0.5) * 100)));

    }, 3000); // Change image every 3 seconds, adjust as needed
    return () => clearInterval(timerId);
  }, []);

  const handleToggleDepthView = useCallback(() => {
    setIsDepthView(prev => !prev);
  }, []);

  const handleQuit = useCallback(() => {
    console.log("Quit button clicked. In a real app, this might close the window or navigate away.");
    alert("Simulation quit action triggered.");
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 sm:p-4 flex flex-col font-[Inter,sans-serif]">
      {/* Top Header Bar */}
      <header className="mb-3 sm:mb-4 flex flex-wrap justify-between items-center gap-2 sm:gap-4 p-3 bg-slate-800/50 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center">
          <CpuChipIcon className="h-6 w-6 sm:h-7 sm:w-7 mr-2 text-sky-500" />
          Autonomous Vehicle Dashboard
        </h1>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ArrowsRightLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            <span className="text-xs sm:text-sm text-slate-400">Mode:</span>
            <span className="text-xs sm:text-sm font-medium text-sky-300 bg-slate-700 px-2 py-1 rounded">
              {inferenceMode}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-400">
            <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-mono">{currentTime}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Column 1: System Info & Sensor Data */}
        <section className="flex flex-col gap-3 sm:gap-4 lg:col-span-1">
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl flex-1">
            <SystemInfoPanel {...systemInfo} />
          </div>
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl flex-1">
            <SensorDataPanel sensorData={sensorData} />
          </div>
        </section>

        {/* Column 2: Controls & Energy Data */}
        <section className="lg:col-span-1 flex flex-col gap-3 sm:gap-4">
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl">
            <div className="flex flex-col gap-3 sm:gap-4 items-center">
                <Button onClick={handleToggleDepthView} variant="primary" fullWidth>
                    <VideoCameraIcon className="h-5 w-5 mr-2 inline"/>
                    {isDepthView ? "Switch to Front View" : "Switch to Depth View"}
                </Button>
                <div className="text-center p-3 sm:p-4 border border-slate-700 rounded-lg w-full bg-slate-700/30">
                    <h3 className="text-md sm:text-lg font-semibold text-sky-300 mb-1.5 sm:mb-2">Real World Car Interface</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        This panel represents the operational status and communication link with the vehicle's hardware.
                        Currently in simulated mode.
                    </p>
                </div>
            </div>
          </div>

          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl">
            <h3 className="text-md sm:text-lg font-semibold text-sky-300 mb-2 sm:mb-3 flex items-center">
              <BoltIcon className="h-5 w-5 mr-2 text-yellow-400" />
              Car Energy Consumption Data
            </h3>
            <InfoItem 
              label="Current Output" 
              value={carEnergyConsumption.toFixed(0)} 
              unit="watts" 
              highlight 
              valueClassName="text-yellow-300 !text-lg" 
            />
          </div>
          
          <div className="mt-auto bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl">
            <Button onClick={handleQuit} variant="danger" fullWidth>
                <PowerIcon className="h-5 w-5 mr-2 inline"/>
                Quit Session
            </Button>
          </div>
        </section>

        {/* Column 3: Camera & Vehicle Control */}
        <section className="lg:col-span-1 flex flex-col gap-3 sm:gap-4">
          <div className="bg-slate-800 p-0.5 rounded-xl shadow-xl flex-[2_2_0%] min-h-[200px] sm:min-h-[300px]">
            <CameraView
              imageSrc={isDepthView ? depthImageSrc : frontImageSrc}
              altText={isDepthView ? "Depth Camera View" : "Front Camera View"}
              title={isDepthView ? "Depth Perception Feed" : "RGB Camera Feed "}
            />
          </div>
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl flex-[1_1_0%] min-h-[180px] sm:min-h-[220px]">
            <SteeringThrottleView steeringAngle={steeringAngle} throttleLevel={throttleLevel} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
