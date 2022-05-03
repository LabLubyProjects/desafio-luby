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
}

export interface InputGetVehicleByID {
  id: string;
}