
import React, { useState, useEffect, useCallback } from 'react';
import { InferenceMode, SensorData, SystemInfo } from './types';
import SystemInfoPanel from './components/SystemInfoPanel';
import SensorDataPanel from './components/SensorDataPanel';
import CameraView from './components/CameraView';
import SteeringThrottleView from './components/SteeringThrottleView';
import Button from './components/Button';
import { PowerIcon, VideoCameraIcon, ArrowsRightLeftIcon, ClockIcon, CpuChipIcon, BoltIcon } from '@heroicons/react/24/outline';
import InfoItem from './components/InfoItem';

const WEBSOCKET_URL = 'ws://localhost:8765'; // Make sure your Python WebSocket server runs on this address

interface WebSocketData {
  mode?: InferenceMode;
  systemInfo?: Partial<SystemInfo>;
  sensorData?: Partial<SensorData>;
  steeringAngle?: number;
  throttleLevel?: number;
  carEnergyConsumption?: number;
  primaryCameraFeed?: string; // Expected to be a base64 data URI (e.g., "data:image/jpeg;base64,...")
}

const App2: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    modelName: "Waiting for data...",
    gpuStatus: "N/A",
    serverCommTime: 0,
    serverResponseTime: 0,
    predictedWaypoints: "N/A",
  });

  const [sensorData, setSensorData] = useState<SensorData>({
    gps: "N/A",
    velocity: 0,
  });

  const [inferenceMode, setInferenceMode] = useState<InferenceMode>(InferenceMode.CLOUD);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}));
  
  const [steeringAngle, setSteeringAngle] = useState<number>(0);
  const [throttleLevel, setThrottleLevel] = useState<number>(0);
  const [carEnergyConsumption, setCarEnergyConsumption] = useState<number>(0);
  const [primaryCameraFeed, setPrimaryCameraFeed] = useState<string>("https://picsum.photos/seed/placeholder/800/450?text=Waiting+for+camera+feed..."); // Initial placeholder
  const [wsStatus, setWsStatus] = useState<string>("Connecting...");

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'}));
    }, 1000);

    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsStatus("Connected");
      // Optionally send a message to the server upon connection
      // ws.send(JSON.stringify({ message: "Dashboard connected" }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as WebSocketData;
        
        if (data.mode) {
          setInferenceMode(data.mode);
        }
        if (data.systemInfo) {
          setSystemInfo(prev => ({ ...prev, ...data.systemInfo }));
        }
        if (data.sensorData) {
          setSensorData(prev => ({ ...prev, ...data.sensorData }));
        }
        if (typeof data.steeringAngle === 'number') {
          setSteeringAngle(data.steeringAngle);
        }
        if (typeof data.throttleLevel === 'number') {
          setThrottleLevel(data.throttleLevel);
        }
        if (typeof data.carEnergyConsumption === 'number') {
          setCarEnergyConsumption(data.carEnergyConsumption);
        }
        if (data.primaryCameraFeed) {
          setPrimaryCameraFeed(data.primaryCameraFeed);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message or updating state:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsStatus(`Error (see console)`);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsStatus("Disconnected. Will attempt to reconnect...");
      // Simple reconnect attempt, you might want more robust logic here
      // setTimeout(() => { /* logic to re-initiate connection */ }, 5000);
    };

    return () => {
      clearInterval(timerId);
      ws.close();
    };
  }, []);


  const handleQuit = useCallback(() => {
    console.log("Quit button clicked.");
    alert("Simulation quit action triggered.");
  }, []);

  // In App2, the depth view toggle is removed as we primarily focus on WebSocket feed.
  // You could add a static depth image or another WebSocket feed for it if needed.

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-3 sm:p-4 flex flex-col font-[Inter,sans-serif]">
      <header className="mb-3 sm:mb-4 flex flex-wrap justify-between items-center gap-2 sm:gap-4 p-3 bg-slate-800/50 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold text-sky-400 flex items-center">
          <CpuChipIcon className="h-6 w-6 sm:h-7 sm:w-7 mr-2 text-sky-500" />
          Vehicle Dashboard (WebSocket)
        </h1>
        <div className="flex items-center gap-3 sm:gap-5">
           <div className="text-xs sm:text-sm text-slate-400">WS: <span className={wsStatus === "Connected" ? "text-green-400" : "text-yellow-400"}>{wsStatus}</span></div>
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

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <section className="flex flex-col gap-3 sm:gap-4 lg:col-span-1">
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl flex-1">
            <SystemInfoPanel {...systemInfo} />
          </div>
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl flex-1">
            <SensorDataPanel sensorData={sensorData} />
          </div>
        </section>

        <section className="lg:col-span-1 flex flex-col gap-3 sm:gap-4">
           {/* Removed Depth View Toggle for Simplicity in WebSocket version */}
          <div className="bg-slate-800 p-3 sm:p-4 rounded-xl shadow-xl">
            <div className="text-center p-3 sm:p-4 border border-slate-700 rounded-lg w-full bg-slate-700/30">
                <h3 className="text-md sm:text-lg font-semibold text-sky-300 mb-1.5 sm:mb-2">Real World Car Interface</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Receiving live data via WebSocket from vehicle.
                </p>
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

        <section className="lg:col-span-1 flex flex-col gap-3 sm:gap-4">
          <div className="bg-slate-800 p-0.5 rounded-xl shadow-xl flex-[2_2_0%] min-h-[200px] sm:min-h-[300px]">
            <CameraView
              imageSrc={primaryCameraFeed}
              altText={"Primary Camera Feed"}
              title={"Primary Camera Feed (Live)"}
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

export default App2;
