import { VehicleStatus } from "@src/domain/vehicle/Vehicle";

export interface InputAcquireNewVehicle {
  sourceEmployeeID: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
}

export interface OutputVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  color: string;
  chassi: string;
  price: number;
  status: string;
}

export interface InputFilterVehicleByStatus {
  status: VehicleStatus;
}

export interface InputGetVehicleByID {
  id: string;
}

export interface InputDeleteVehicle {
  sourceEmployeeID: string;
  targetVehicleID: string;
}