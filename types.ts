
export interface SystemStatusData {
  modelName: string;
  gpu: string;
  serverCommTime: number;
  serverRespTime: number;
  predictedWaypoints: string;
}

export interface SensorOutputData {
  gpsCoordinates: string;
  velocity: number;
}

export interface CarEnergyConsumptionData {
  currentOutput: number;
}

export interface GaugeProps {
  label: string;
  value: number;
  minValue?: number;
  maxValue?: number;
  unit: string;
  size?: number;
}

export interface PanelProps {
  title?: string;
  titleColor?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
    