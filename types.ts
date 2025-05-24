
export enum InferenceMode {
  LOCAL = "Local",
  CLOUD = "Cloud",
}

export interface SensorData {
  gps: string;
  velocity: number; // km/h
}

export interface SystemInfo {
  modelName: string;
  gpuStatus: string;
  serverCommTime: number; // ms
  serverResponseTime: number; // ms
  predictedWaypoints: string; // example: "[(10,5), (12,7)]"
}

export interface InfoItemProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  valueClassName?: string;
}
    